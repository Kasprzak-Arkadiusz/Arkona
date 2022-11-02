using Application.Common.Exceptions;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.DbSelectors;
using Application.Seances.ViewModels;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Seances.Queries;

public class GetSeanceDetailsQuery : IRequest<GetSeanceDetailsViewModel>
{
    public int SeanceId { get; }

    public GetSeanceDetailsQuery(int seanceId)
    {
        SeanceId = seanceId;
    }
}

internal class GetSeanceDetailsQueryHandler : IRequestHandler<GetSeanceDetailsQuery, GetSeanceDetailsViewModel>
{
    private readonly IApplicationDbContext _dbContext;

    public GetSeanceDetailsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<GetSeanceDetailsViewModel> Handle(GetSeanceDetailsQuery query,
        CancellationToken cancellationToken)
    {
        var seance = await _dbContext.Seances
            .GetSeanceDetails()
            .FirstOrDefaultAsync(s => s.Id == query.SeanceId, cancellationToken);
        if (seance is null)
        {
            throw new NotFoundException($"Nie istnieje seans z podanym identyfikatorem: {query.SeanceId}");
        }

        var viewModel = new GetSeanceDetailsViewModel
        {
            MovieTitle = seance.MovieTitle,
            HallNumber = seance.HallNumber,
            SeanceDate = seance.SeanceDate,
            SeanceTime = seance.SeanceTime
        };
        return viewModel;
    }
}