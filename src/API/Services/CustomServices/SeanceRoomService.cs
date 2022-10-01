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

        // if (!addResult)
        // {
        //     return;
        // }
        //
        // var getChangesResult = _seatsState.TryGetValue(seanceId, out var changes);
        // if (!getChangesResult)
        // {
        //     return;
        // }
        //
        // foreach (var change in changes!)
        // {
        //     SendMessageToSubscriberAsync(
        //             new KeyValuePair<string, IServerStreamWriter<ChooseSeatResponse>>(userId, response), change.Value)
        //         .Wait();
        // }
    }

    public void Leave(int seanceId, string userId)
    {
        if (!_seanceRooms.TryGetValue(seanceId, out var dictionary))
        {
            return;
        }

        dictionary.TryRemove(userId, out _);

        if (dictionary.Any())
        {
            return;
        }

        _seanceRooms.TryRemove(seanceId, out _);
        _seatsState.TryRemove(seanceId, out _);
    }

    public void MakeUpChanges(int seanceId, string userId, IServerStreamWriter<ChooseSeatResponse> streamWriter)
    {
        var roomExists = _seanceRooms.TryGetValue(seanceId, out var dictionary);
        var userExists = dictionary?.TryGetValue(userId, out _);
        if (!roomExists || (userExists != null && userExists.Value))
        {
            return;
        }

        var getChangesResult = _seatsState.TryGetValue(seanceId, out var changes);
        if (!getChangesResult)
        {
            return;
        }

        foreach (var change in changes!)
        {
            SendMessageToSubscriberAsync(
                new KeyValuePair<string, IServerStreamWriter<ChooseSeatResponse>>(userId, streamWriter),
                change.Value).Wait();
        }
    }

    public async Task BroadcastAsync(ChooseSeatRequest message) => await BroadcastMessagesAsync(message);

    private async Task BroadcastMessagesAsync(ChooseSeatRequest message)
    {
        _seanceRooms.TryGetValue(message.SeanceId, out var dictionary);

        if (message.SeatId == 0)
        {
            return;
        }

        SaveSeatChange(message);

        if (dictionary != null)
        {
            foreach (var streamWriter in dictionary.Where(d => d.Key != message.UserId))
            {
                var response = new ChooseSeatResponse
                {
                    SeatId = message.SeatId,
                    IsFree = !message.IsChosen
                };

                await SendMessageToSubscriberAsync(streamWriter, response);
            }
        }
    }

    private void SaveSeatChange(ChooseSeatRequest message)
    {
        var response = new ChooseSeatResponse
        {
            SeatId = message.SeatId,
            IsFree = !message.IsChosen
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