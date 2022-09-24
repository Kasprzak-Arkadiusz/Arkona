using System.Collections.Concurrent;
using Grpc.Core;

namespace API.Services.CustomServices;

public class SeanceRoomService
{
    private readonly ConcurrentDictionary<int, ConcurrentDictionary<string, IServerStreamWriter<ChooseSeatResponse>>>
        _seanceRooms = new();

    public void Join(int seanceId, string userId, IServerStreamWriter<ChooseSeatResponse> response)
    {
        var dictionary = new ConcurrentDictionary<string, IServerStreamWriter<ChooseSeatResponse>>();
        dictionary.TryAdd(userId, response);

        _seanceRooms.AddOrUpdate(seanceId, dictionary, (key, value) =>
        {
            value.TryAdd(userId, response);
            return value;
        });
    }

    public void Leave(int seanceId, string userId, IServerStreamWriter<ChooseSeatResponse> response)
    {
        if (!_seanceRooms.TryGetValue(seanceId, out var dictionary))
        {
            return;
        }

        dictionary.TryRemove(userId, out _);

        if (!dictionary.Any())
        {
            _seanceRooms.TryRemove(seanceId, out _);
        }
    }

    public async Task BroadcastAsync(ChooseSeatRequest message) => await BroadcastMessagesAsync(message);

    private async Task BroadcastMessagesAsync(ChooseSeatRequest message)
    {
        _seanceRooms.TryGetValue(message.SeanceId, out var dictionary);

        if (dictionary != null && message.SeatId != 0)
        {
            foreach (var streamWriter in dictionary.Where(d => d.Key != message.UserId))
            {
                await SendMessageToSubscriberAsync(streamWriter, message);
            }
        }
    }

    private static async Task SendMessageToSubscriberAsync(
        KeyValuePair<string, IServerStreamWriter<ChooseSeatResponse>> streamWriter, ChooseSeatRequest message)
    {
        var response = new ChooseSeatResponse
        {
            SeatId = message.SeatId,
            IsFree = !message.IsChosen
        };

        await streamWriter.Value.WriteAsync(response);
    }
}