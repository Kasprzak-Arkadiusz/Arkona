using API.Services.CustomServices;
using Application.Seances.Queries;
using Application.Seats.Queries;
using Domain.Services;
using Grpc.Core;
using MediatR;

namespace API.Services;

public class SeanceService : Seance.SeanceBase
{
    private readonly IMediator _mediator;
    private readonly SeanceRoomService _seanceRoomService;

    public SeanceService(IMediator mediator, SeanceRoomService seanceRoomService)
    {
        _mediator = mediator;
        _seanceRoomService = seanceRoomService;
    }

    public override async Task<GetClosestSeancesResponse> GetClosestSeances(GetClosestSeancesRequest request,
        ServerCallContext context)
    {
        var seances = await _mediator.Send(new GetClosestSeancesQuery(request.MovieId));

        var response = new GetClosestSeancesResponse();
        foreach (var dict in seances)
        {
            var seanceInfoArray = new SeanceInfoArray
            {
                Key = dict.Key
            };

            seanceInfoArray.Seances.AddRange(dict.Value.Select(si => new SeanceInfo
            {
                Id = si.Id,
                Time = si.Time
            }));

            response.Values.Add(seanceInfoArray);
        }

        return response;
    }

    public override async Task<GetSeatsBySeanceResponse> GetSeatsBySeance(GetSeatsBySeanceRequest request,
        ServerCallContext context)
    {
        var seanceSeats = await _mediator.Send(new GetSeatsBySeanceQuery(request.SeanceId));

        var leftSection = new SeanceSeatSection
        {
            Section = CinemaHallSection.Left,
            Width = CinemaHallSectionService.NumberOfSeatsInSideSection
        };
        leftSection.Seats.AddRange(seanceSeats.Where(ss => ss.Section == Domain.Enums.CinemaHallSection.Left)
            .Select(ss => new SeanceSeatInfo
            {
                Id = ss.Id,
                Number = ss.Number,
                Row = ss.Row.ToString(),
                IsFree = ss.IsFree
            }));

        var middleSection = new SeanceSeatSection
        {
            Section = CinemaHallSection.Middle,
            Width = CinemaHallSectionService.NumberOfSeatsInARow -
                    2 * CinemaHallSectionService.NumberOfSeatsInSideSection
        };
        middleSection.Seats.AddRange(seanceSeats.Where(ss => ss.Section == Domain.Enums.CinemaHallSection.Middle)
            .Select(ss => new SeanceSeatInfo
            {
                Id = ss.Id,
                Number = ss.Number,
                Row = ss.Row.ToString(),
                IsFree = ss.IsFree
            }));

        var rightSection = new SeanceSeatSection
        {
            Section = CinemaHallSection.Right,
            Width = CinemaHallSectionService.NumberOfSeatsInSideSection
        };
        rightSection.Seats.AddRange(seanceSeats.Where(ss => ss.Section == Domain.Enums.CinemaHallSection.Right)
            .Select(ss => new SeanceSeatInfo
            {
                Id = ss.Id,
                Number = ss.Number,
                Row = ss.Row.ToString(),
                IsFree = ss.IsFree
            }));

        var response = new GetSeatsBySeanceResponse
        {
            Sections = { leftSection, middleSection, rightSection },
            NumberOfRows = seanceSeats.Count / CinemaHallSectionService.NumberOfSeatsInARow
        };
        return response;
    }

    public override async Task ChooseSeat(IAsyncStreamReader<ChooseSeatRequest> requestStream,
        IServerStreamWriter<ChooseSeatResponse> responseStream, ServerCallContext context)
    {
        var result = await requestStream.MoveNext(context.CancellationToken);
        var seanceId = requestStream.Current.SeanceId;
        var userId = requestStream.Current.UserId;

        try
        {
            _seanceRoomService.MakeUpChanges(seanceId, userId, responseStream);
            _seanceRoomService.Join(seanceId, userId, responseStream);

            while (!context.CancellationToken.IsCancellationRequested)
            {
                while (result)
                {
                    var current = requestStream.Current;
                    await _seanceRoomService.BroadcastAsync(current);
                    result = await requestStream.MoveNext(context.CancellationToken);
                }

                await Task.Delay(100);
            }
        }
        finally
        {
            _seanceRoomService.Leave(seanceId, userId);
        }
    }
}