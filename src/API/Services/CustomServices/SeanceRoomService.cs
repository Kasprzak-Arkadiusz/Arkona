using System.Collections.Concurrent;
using Grpc.Core;

namespace API.Services.CustomServices;

public class SeanceRoomService
{
    private ConcurrentDictionary<int, ConcurrentDictionary<int, IServerStreamWriter<ChooseSeatResponse>>> _seanceRooms =
        new();

    public void Join(int seanceId, int userId, IServerStreamWriter<ChooseSeatResponse> response)
    {
        var dictionary = new ConcurrentDictionary<int, IServerStreamWriter<ChooseSeatResponse>>();
        dictionary.TryAdd(userId, response);

        _seanceRooms.AddOrUpdate(seanceId, dictionary, (key, value) =>
        {
            value.TryAdd(key, response);
            return value;
        });
    }

    public void Leave(int seanceId, int userId, IServerStreamWriter<ChooseSeatResponse> response)
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

        if (dictionary != null)
        {
            foreach (var streamWriter in dictionary.Where(d => d.Key != message.UserId))
            {
                await SendMessageToSubscriberAsync(streamWriter, message);
            }
        }
    }

    private static async Task SendMessageToSubscriberAsync(
        KeyValuePair<int, IServerStreamWriter<ChooseSeatResponse>> streamWriter, ChooseSeatRequest message)
    {
        var response = new ChooseSeatResponse
        {
            SeanceId = message.SeanceId,
            SeatId = message.SeatId,
            IsFree = !message.IsChosen
        };

        await streamWriter.Value.WriteAsync(response);
    }
}