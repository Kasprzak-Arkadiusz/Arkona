using Application.Common.Exceptions;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.Offers.ViewModels;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Offers.Queries;

public class GetAvailableOffersQuery : IRequest<IEnumerable<AvailableOfferInfo>>
{
    public int SeanceId { get; }

    public GetAvailableOffersQuery(int seanceId)
    {
        SeanceId = seanceId;
    }
}

public class GetAvailableOffersQueryHandler : IRequestHandler<GetAvailableOffersQuery, IEnumerable<AvailableOfferInfo>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetAvailableOffersQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<AvailableOfferInfo>> Handle(GetAvailableOffersQuery query,
        CancellationToken cancellationToken)
    {
        var seance = await _dbContext.Seances
            .Include(s => s.Movie)
            .ThenInclude(m => m.MovieGenres)
            .Select(s => new
            {
                Id = s.Id,
                GenreIds = s.Movie.MovieGenres.Select(mg => mg.GenreId),
                Date = DateOnly.FromDateTime(s.StartDateTime)
            })
            .FirstOrDefaultAsync(s => s.Id == query.SeanceId, cancellationToken);
        if (seance is null)
        {
            throw new NotFoundException("Nie istnieje seans z podanym id.");
        }

        var offerList = new List<Offer>();
        offerList.AddRange(await _dbContext.AgeOffers
            .Where(o => o.ValidPeriod.ValidFrom <= seance.Date && o.ValidPeriod.ValidTo >= seance.Date)
            .ToListAsync(cancellationToken));
        
        offerList.AddRange(await _dbContext.AmountOffers
            .Where(o => o.ValidPeriod.ValidFrom <= seance.Date && o.ValidPeriod.ValidTo >= seance.Date)
            .ToListAsync(cancellationToken));
        
        offerList.AddRange(await _dbContext.MovieGenreOffers
            .Where(o => o.ValidPeriod.ValidFrom <= seance.Date && o.ValidPeriod.ValidTo >= seance.Date
                    && seance.GenreIds.Contains(o.GenreId))
            .ToListAsync(cancellationToken));

        var offers = offerList.Select(o => new AvailableOfferInfo(o.Id, o.Name, o.Description));
        return offers;
    }
}