using System.Collections.Concurrent;
using Grpc.Core;
using Serilog;

namespace API.Services.CustomServices;

public class SeanceRoomService
{
    private readonly ConcurrentDictionary<int, ConcurrentDictionary<string, IServerStreamWriter<ChooseSeatResponse>>>
        _seanceRooms = new();

    private readonly ConcurrentDictionary<int, ConcurrentDictionary<int, ChooseSeatResponse>> _seatsState = new();

    public void Join(int seanceId, string userId, IServerStreamWriter<ChooseSeatResponse> response)
    {
        Log.Information("User: {UserId} tries to join", userId);
        _seanceRooms.TryGetValue(seanceId, out var seanceRoom);
        if (seanceRoom is null)
        {
            // Utwórz pokój
            Log.Information("Room does not exists. Creating room");
            var dictionary = new ConcurrentDictionary<string, IServerStreamWriter<ChooseSeatResponse>>();
            // Dodaj użytkownika
            lock (_seanceRooms)
            {
                if (_seanceRooms.TryAdd(seanceId, dictionary))
                {
                    Log.Information("Room created");
                }

                if (dictionary.TryAdd(userId, response))
                {
                    Log.Information("User: {UserId} subscribed",userId);
                }
            }

            return;
        }

        Log.Information("Room exists");
        seanceRoom!.TryGetValue(userId, out var streamWriters);
        if (streamWriters is not null)
        {
            return;
        }

        lock (_seanceRooms)
        {
            if (seanceRoom.TryAdd(userId, response))
            {
                Log.Information("User: {UserId} subscribed",userId);
            }
        }
    }

    public void Leave(int seanceId, string userId)
    {
        Log.Information("User: {UserId} is trying to leave", userId);
        if (!_seanceRooms.TryGetValue(seanceId, out var dictionary))
        {
            Log.Information("User: {UserId} left, because the seance room does not exist", userId);
            return;
        }

        if (!dictionary.TryRemove(userId, out _))
        {
            Log.Information("User: {UserId} has already left", userId);
            return;
        }

        RemoveUserChanges(seanceId, userId);

        if (dictionary.Any())
        {
            return;
        }

        Log.Information("Last user: {UserId} left. Cleaning up the seance room", userId);

        _seanceRooms.TryRemove(seanceId, out _);
        _seatsState.TryRemove(seanceId, out _);
    }

    public void Disconnect(int seanceId, string userId)
    {
        Log.Information("Disconnect requested. Disconnecting...");
        if (!_seanceRooms.TryGetValue(seanceId, out var dictionary))
        {
            Log.Information("Seance room does not exist");
            return;
        }

        Log.Information("Removing user: {UserId} from listeners", userId);
        dictionary.TryRemove(userId, out _);
    }

    private void RemoveUserChanges(int seanceId, string userId)
    {
        if (!_seatsState.TryGetValue(seanceId, out var dictionary))
        {
            Log.Information("User: {UserId} has not changed anything. Returning...", userId);
            return;
        }

        Log.Information("Removing changes of user: {UserId}", userId);

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
                Log.Information("Cannot remove changes of user: {UserId}. The seance room does not exist", userId);
                return;
            }

            Log.Information("Broadcasting changes of user: {UserId} to other listeners", userId);
            foreach (var (seatId, _) in dictionary.Where(d => d.Value.UserId == userId))
            {
                dictionary.TryRemove(seatId, out _);
                changeMessage.SeatId = seatId;
                BroadcastChangeAsync(changeMessage, seanceDictionary).Wait();
            }
        }
    }

    public async Task MakeUpChanges(int seanceId, string userId, IServerStreamWriter<ChooseSeatResponse> streamWriter)
    {
        Log.Information("User: {UserId}, tries to make up changes", userId);
        if (!_seanceRooms.TryGetValue(seanceId, out _))
        {
            Log.Information("User: {UserId} do not have to make up changes, because he is the first in the seance room",
                userId);
            return;
        }

        if (!_seatsState.TryGetValue(seanceId, out var changes))
        {
            Log.Information("User: {UserId},  do not have to make up changes, because there was not changes", userId);
            return;
        }

        Log.Information("User: {UserId} is making up changes", userId);
        Log.Information("Changes: {Changes}", changes);
        foreach (var change in changes)
        {
            await SendMessageToSubscriberAsync(
                new KeyValuePair<string, IServerStreamWriter<ChooseSeatResponse>>(userId, streamWriter),
                change.Value);
        }
    }

    public async Task BroadcastAsync(ChooseSeatRequest message) => await BroadcastMessagesAsync(message);

    private async Task BroadcastMessagesAsync(ChooseSeatRequest message)
    {
        Log.Information("Broadcasting message");
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

        Log.Information("Message broadcast: {Response}", response);

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
            Log.Information("Message broadcast to userId: {UserId}", streamWriter.Key);
            await SendMessageToSubscriberAsync(streamWriter, response);
        }
    }

    private void SaveSeatChange(ChooseSeatRequest message)
    {
        Log.Information("Saving seat changes: {Message}", message);
        var response = new ChooseSeatResponse
        {
            SeatId = message.SeatId,
            IsFree = !message.IsChosen,
            UserId = message.UserId
        };

        var dictionary = new ConcurrentDictionary<int, ChooseSeatResponse>();
        dictionary.TryAdd(message.SeatId, response);

        Log.Information("Trying to save seat changes");
        _seatsState.AddOrUpdate(message.SeanceId, dictionary, (_, value) =>
        {
            lock (value)
            {
                value.AddOrUpdate(message.SeatId, response, (_, _) => response);
                Log.Information("Seat change saved");
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