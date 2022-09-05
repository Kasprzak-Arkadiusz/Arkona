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
}