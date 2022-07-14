using Application.Common.Interfaces.IApplicationDBContext;
using Application.Common.Models;
using Application.Movies.ViewModels;
using MediatR;

namespace Application.Movies.Queries;

public class GetMoviesQuery : IRequest<PaginatedList<GeneralMovieInfo>>
{
    public int PageNumber { get; }
    public int PageSize { get; }

    public GetMoviesQuery(int pageNumber, int pageSize)
    {
        PageNumber = pageNumber;
        PageSize = pageSize;
    }
}

public class GetMoviesQueryHandler : IRequestHandler<GetMoviesQuery, PaginatedList<GeneralMovieInfo>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetMoviesQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PaginatedList<GeneralMovieInfo>> Handle(GetMoviesQuery query, CancellationToken cancellationToken)
    {
        var movies = _dbContext.Movies
            .OrderByDescending(m => m.ReleaseDate)
            .Select(m => new GeneralMovieInfo(m.Id, m.Title, m.Image));

        var generalMovieInfo =
            await PaginatedList<GeneralMovieInfo>.CreateAsync(movies, query.PageNumber, query.PageSize);
        
        return generalMovieInfo;
    }
}