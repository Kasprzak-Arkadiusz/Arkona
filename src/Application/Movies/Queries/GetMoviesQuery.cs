using Application.Common.Interfaces.IApplicationDBContext;
using Application.Common.Models;
using Application.Movies.ViewModels;
using MediatR;

namespace Application.Movies.Queries;

public class GetMoviesQuery : IRequest<PaginatedList<MovieInfo>>
{
    public int PageNumber { get; }
    public int PageSize { get; }

    public GetMoviesQuery(int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        PageSize = pageSize;
    }
}

public class GetMoviesQueryHandler : IRequestHandler<GetMoviesQuery, PaginatedList<MovieInfo>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetMoviesQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PaginatedList<MovieInfo>> Handle(GetMoviesQuery query, CancellationToken cancellationToken)
    {
        var movies = _dbContext.Movies
            .OrderByDescending(m => m.ReleaseDate)
            .Select(m => new MovieInfo
            {
                Id = m.Id,
                Image = m.Image,
                Title = m.Title,
                ReleaseDate = m.ReleaseDate,
                Duration = m.Duration,
                Genres = m.MovieGenres.Select(mg => mg.Genre.Name).ToList(),
                AgeRestriction = m.AgeRestriction.Name
            });

        var generalMovieInfo =
            await PaginatedList<MovieInfo>.CreateAsync(movies, query.PageNumber, query.PageSize);
        
        return generalMovieInfo;
    }
}