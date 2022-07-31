using Application.Common.Interfaces.IApplicationDBContext;
using Application.Offers.ViewModels;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Offers.Queries;

public class GetLatestOffersQuery : IRequest<IEnumerable<GeneralOfferInfo>>
{
    public short Count { get; }

    public GetLatestOffersQuery(short count)
    {
        Count = count;
    }
}

public class GetLatestOffersQueryHandler : IRequestHandler<GetLatestOffersQuery, IEnumerable<GeneralOfferInfo>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetLatestOffersQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<GeneralOfferInfo>> Handle(GetLatestOffersQuery query,
        CancellationToken cancellationToken)
    {
        var offers = await _dbContext.Offers.Select(o => new
            {
                generalInfo = new GeneralOfferInfo(o.Id, o.Name, o.Image),
                validFrom = o.ValidPeriod.ValidFrom
            })
            .OrderBy(o => o.validFrom)
            .Select(i => i.generalInfo)
            .Take(query.Count)
            .ToListAsync(cancellationToken);

        return offers;
    }
}