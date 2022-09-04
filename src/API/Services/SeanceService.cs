using Application.Seances.Queries;
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
        response.Seances.AddRange(seances.Select(s => new SeanceInfo
        {
            Id = s.Id,
            Time = s.Time,
            DayOfWeek = s.DayOfWeek
        }));

        return response;
    }
}