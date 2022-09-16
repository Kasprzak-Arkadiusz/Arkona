using Application.Seances.Queries;
using Application.Seats.Queries;
using Grpc.Core;
using MediatR;

namespace API.Services;

public class SeanceService : Seance.SeanceBase
{
    private readonly IMediator _mediator;

    public SeanceService(IMediator mediator)
    {
        _mediator = mediator;
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

        var leftSection = new SeanceSeatSection { Section = CinemaHallSection.Left };
        leftSection.Seats.AddRange(seanceSeats.Where(ss => ss.Section == Domain.Enums.CinemaHallSection.Left)
            .Select(ss => new SeanceSeatInfo
            {
                Id = ss.Id,
                Number = ss.Number,
                Row = ss.Row.ToString(),
                IsFree = ss.IsFree
            }));

        var middleSection = new SeanceSeatSection { Section = CinemaHallSection.Middle };
        middleSection.Seats.AddRange(seanceSeats.Where(ss => ss.Section == Domain.Enums.CinemaHallSection.Middle)
            .Select(ss => new SeanceSeatInfo
            {
                Id = ss.Id,
                Number = ss.Number,
                Row = ss.Row.ToString(),
                IsFree = ss.IsFree
            }));

        var rightSection = new SeanceSeatSection { Section = CinemaHallSection.Right };
        rightSection.Seats.AddRange(seanceSeats.Where(ss => ss.Section == Domain.Enums.CinemaHallSection.Right)
            .Select(ss => new SeanceSeatInfo
            {
                Id = ss.Id,
                Number = ss.Number,
                Row = ss.Row.ToString(),
                IsFree = ss.IsFree
            }));

        var response = new GetSeatsBySeanceResponse { Sections = { leftSection, middleSection, rightSection } };
        return response;
    }
}