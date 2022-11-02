using Application.Common.Interfaces.IApplicationDBContext;
using Application.DbSelectors;
using Application.Seats.ViewModels;
using Domain.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Seats.Queries;

public class GetSeatsBySeanceQuery : IRequest<IList<SeanceSeatInfo>>
{
    public int SeanceId { get; }

    public GetSeatsBySeanceQuery(int seanceId)
    {
        SeanceId = seanceId;
    }
}

public class GetSeatsBySeanceHandler : IRequestHandler<GetSeatsBySeanceQuery, IList<SeanceSeatInfo>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetSeatsBySeanceHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IList<SeanceSeatInfo>> Handle(GetSeatsBySeanceQuery query, CancellationToken cancellationToken)
    {
       var seanceSeats = await _dbContext.SeanceSeats
            .GetSeanceSeatsBySeanceId(query.SeanceId)
            .ToListAsync(cancellationToken);

       var seanceSeatInfo = seanceSeats.Select(s => new SeanceSeatInfo
        {
            Id = s.Id,
            Number = s.Number,
            Row = s.Row,
            IsFree = s.IsFree,
            Section = CinemaHallSectionService.GetSectionBySeatNumber(s.Number)
        }).ToList();

        return seanceSeatInfo;
    }
}