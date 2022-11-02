using System.Collections.Concurrent;
using Grpc.Core;

namespace API.Services.CustomServices;

public class SeanceRoomService
{
    private readonly ConcurrentDictionary<int, ConcurrentDictionary<string, IServerStreamWriter<ChooseSeatResponse>>>
        _seanceRooms = new();

    private readonly ConcurrentDictionary<int, ConcurrentDictionary<int, ChooseSeatResponse>> _seatsState = new();

    public void Join(int seanceId, string userId, IServerStreamWriter<ChooseSeatResponse> response)
    {
        var dictionary = new ConcurrentDictionary<string, IServerStreamWriter<ChooseSeatResponse>>();
        dictionary.TryAdd(userId, response);

        _seanceRooms.AddOrUpdate(seanceId, dictionary, (_, value) =>
        {
            lock (value)
            {
                value.TryAdd(userId, response);
                return value;
            }
        });
    }

    public void Leave(int seanceId, string userId)
    {
        if (!_seanceRooms.TryGetValue(seanceId, out var dictionary))
        {
            return;
        }

        if (!dictionary.TryRemove(userId, out _))
        {
            return;
        }

        RemoveUserChanges(seanceId, userId);

        if (dictionary.Any())
        {
            return;
        }

        _seanceRooms.TryRemove(seanceId, out _);
        _seatsState.TryRemove(seanceId, out _);
    }

    public void Disconnect(int seanceId, string userId)
    {
        if (!_seanceRooms.TryGetValue(seanceId, out var dictionary))
        {
            return;
        }

        dictionary.TryRemove(userId, out _);
    }

    private void RemoveUserChanges(int seanceId, string userId)
    {
        if (!_seatsState.TryGetValue(seanceId, out var dictionary))
        {
            return;
        }
        
        lock (dictionary)
        {
            var changeMessage = new ChooseSeatResponse
            {
                UserId = userId,
                IsFree = true
            };

            _seanceRooms.TryGetValue(seanceId, out var seanceDictionary);
            if (seanceDictionary == null)
            {
                return;
            }

            foreach (var (seatId, _) in dictionary.Where(d => d.Value.UserId == userId))
            {
                dictionary.TryRemove(seatId, out _);
                changeMessage.SeatId = seatId;
                BroadcastChangeAsync(changeMessage, seanceDictionary).Wait();
            }
        }
    }

    public void MakeUpChanges(int seanceId, string userId, IServerStreamWriter<ChooseSeatResponse> streamWriter)
    {
        if (!_seanceRooms.TryGetValue(seanceId, out _))
        {
            return;
        }

        if (!_seatsState.TryGetValue(seanceId, out var changes))
        {
            return;
        }

        foreach (var change in changes)
        {
            SendMessageToSubscriberAsync(
                new KeyValuePair<string, IServerStreamWriter<ChooseSeatResponse>>(userId, streamWriter),
                change.Value).Wait();
        }
    }

    public async Task BroadcastAsync(ChooseSeatRequest message) => await BroadcastMessagesAsync(message);

    private async Task BroadcastMessagesAsync(ChooseSeatRequest message)
    {
        if (message.SeatId == 0)
        {
            return;
        }

        SaveSeatChange(message);
        var response = new ChooseSeatResponse
        {
            SeatId = message.SeatId,
            IsFree = !message.IsChosen,
            UserId = message.UserId
        };

        _seanceRooms.TryGetValue(message.SeanceId, out var dictionary);
        if (dictionary != null)
        {
            await BroadcastChangeAsync(response, dictionary);
        }
    }

    private static async Task BroadcastChangeAsync(ChooseSeatResponse response,
        ConcurrentDictionary<string, IServerStreamWriter<ChooseSeatResponse>> seanceRoom)
    {
        foreach (var streamWriter in seanceRoom.Where(d => d.Key != response.UserId))
        {
            await SendMessageToSubscriberAsync(streamWriter, response);
        }
    }

    private void SaveSeatChange(ChooseSeatRequest message)
    {
        var response = new ChooseSeatResponse
        {
            SeatId = message.SeatId,
            IsFree = !message.IsChosen,
            UserId = message.UserId
        };
        
        var dictionary = new ConcurrentDictionary<int, ChooseSeatResponse>();
        dictionary.TryAdd(message.SeatId, response);

        _seatsState.AddOrUpdate(message.SeanceId, dictionary, (_, value) =>
        {
            lock (value)
            {
                value.AddOrUpdate(message.SeatId, response, (_, _) => response);
            }

            return value;
        });
    }

    private static async Task SendMessageToSubscriberAsync(
        KeyValuePair<string, IServerStreamWriter<ChooseSeatResponse>> streamWriter, ChooseSeatResponse response)
    {
        await streamWriter.Value.WriteAsync(response);
    }
}