using Application.Common.Exceptions;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.DbSelectors;
using Application.Offers.ViewModels;
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

        var offerList = new List<AvailableOfferResult>();
        offerList.AddRange(await _dbContext.AgeOffers
            .GetAvailableOfferResult(seance.Date)
            .ToListAsync(cancellationToken));

        offerList.AddRange(await _dbContext.AmountOffers
            .GetAvailableOfferResult(seance.Date)
            .ToListAsync(cancellationToken));

        offerList.AddRange(await _dbContext.MovieGenreOffers
            .GetAvailableOfferResult(seance.Date, seance.GenreIds)
            .ToListAsync(cancellationToken));

        var offers = offerList.Select(o => new AvailableOfferInfo(o.Id, o.Name, o.Description, o.MinTickets));
        return offers;
    }
}