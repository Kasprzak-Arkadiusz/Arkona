using Application.Common.Interfaces.IApplicationDBContext;
using Application.Movies.ViewModels;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Movies.Queries;

public class GetLatestMoviesQuery : IRequest<IEnumerable<GeneralMovieInfo>>
{
    public int Count { get; }

    public GetLatestMoviesQuery(int count)
    {
        Count = count;
    }
}

public class GetLatestMoviesQueryHandler : IRequestHandler<GetLatestMoviesQuery, IEnumerable<GeneralMovieInfo>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetLatestMoviesQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<GeneralMovieInfo>> Handle(GetLatestMoviesQuery query,
        CancellationToken cancellationToken)
    {
        var nonNegativeCount = query.Count > 0 ? query.Count : 4;
        
        var movies = await _dbContext.Movies
            .OrderByDescending(m => m.ReleaseDate)
            .Select(m => new GeneralMovieInfo(m.Id, m.Title, m.Image))
            .Take(nonNegativeCount)
            .ToListAsync(cancellationToken);

        return movies;
    }
}