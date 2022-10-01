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
        Log.Information("User: {UserId} left", userId);
        if (!_seanceRooms.TryGetValue(seanceId, out var dictionary))
        {
            return;
        }

        Log.Information("User: {UserId} removed from listeners", userId);
        dictionary.TryRemove(userId, out _);

        if (dictionary.Any())
        {
            return;
        }

        Log.Information("Seance room {SeanceId} removed", seanceId);
        _seanceRooms.TryRemove(seanceId, out _);
        _seatsState.TryRemove(seanceId, out _);
    }

    public void MakeUpChanges(int seanceId, string userId, IServerStreamWriter<ChooseSeatResponse> streamWriter)
    {
        var roomExists = _seanceRooms.TryGetValue(seanceId, out _);
        Log.Information("Room exists? {RoomExists}", roomExists);
        if (!roomExists)
        {
            return;
        }

        var getChangesResult = _seatsState.TryGetValue(seanceId, out var changes);
        Log.Information("Changes exist? {ChangesExist}", getChangesResult);
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
        if (message.SeatId == 0)
        {
            return;
        }

        SaveSeatChange(message);

        _seanceRooms.TryGetValue(message.SeanceId, out var dictionary);
        if (dictionary != null)
        {
            Log.Information(
                "Message broadcasted from {UserId} with content: {{isFree: {IsFree}, seatId: {SeatId}, userId: {UserId2}}}",
                message.UserId, !message.IsChosen, message.SeatId, message.UserId);
            foreach (var streamWriter in dictionary.Where(d => d.Key != message.UserId))
            {
                var response = new ChooseSeatResponse
                {
                    SeatId = message.SeatId,
                    IsFree = !message.IsChosen,
                    UserId = message.UserId
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
            IsFree = !message.IsChosen,
            UserId = message.UserId
        };
        Log.Information("Seat change SeatId: {SeatId}, IsFree: {IsFree}, UserId: {UserId} saved",
            response.SeatId, response.IsFree, response.UserId);

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
        Log.Information(
            "Message sent to user: {UserId} with content: {{isFree: {IsFree}, seatId: {SeatId}, userId: {UserId2}}}",
            response.UserId, response.IsFree, response.SeatId, response.UserId);
        await streamWriter.Value.WriteAsync(response);
    }
}