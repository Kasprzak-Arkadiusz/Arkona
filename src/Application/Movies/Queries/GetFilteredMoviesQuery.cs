using Application.Common.Interfaces.IApplicationDBContext;
using Application.Common.Models;
using Application.Movies.ViewModels;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Movies.Queries;

public class GetFilteredMoviesQuery : IRequest<PaginatedList<MovieInfo>>
{
    public string Title { get; }
    public int Genre { get; }
    public int AgeRestriction { get; }
    public DateTime Date { get; }
    public int PageNumber { get; }
    public int PageSize { get; }

    public GetFilteredMoviesQuery(string title, int genre, int ageRestriction, DateTime date, int pageNumber,
        int pageSize)
    {
        Title = title;
        Genre = genre;
        AgeRestriction = ageRestriction;
        Date = date;
        PageNumber = pageNumber;
        PageSize = pageSize;
    }
}

public class GetFilteredMoviesQueryHandler : IRequestHandler<GetFilteredMoviesQuery, PaginatedList<MovieInfo>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetFilteredMoviesQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<PaginatedList<MovieInfo>> Handle(GetFilteredMoviesQuery query,
        CancellationToken cancellationToken)
    {
        var movies = _dbContext.Movies.Include(m => m.Seances).AsQueryable();
        
        movies = ApplyFilters(movies, query);
        
        var movieInfo = movies.Select(m => new MovieInfo
        {
            Id = m.Id,
            Image = m.Image,
            Title = m.Title,
            ReleaseDate = m.ReleaseDate,
            Duration = m.Duration,
            Genres = m.MovieGenres.Select(mg => mg.Genre.Name).ToList(),
            AgeRestriction = m.AgeRestriction.Name
        }).OrderByDescending(m => m.ReleaseDate);

        var generalMovieInfo =
            await PaginatedList<MovieInfo>.CreateAsync(movieInfo, query.PageNumber, query.PageSize);

        return generalMovieInfo;
    }

    private static IQueryable<Movie> ApplyFilters(IQueryable<Movie> source, GetFilteredMoviesQuery query)
    {
        if (!string.IsNullOrEmpty(query.Title))
        {
            source = source.Where(m => m.Title.Contains(query.Title));
        }

        if (query.Genre >= 0)
        {
            source = source.Where(m => m.MovieGenres.Any(mg => (int)mg.GenreId == query.Genre));
        }

        if (query.AgeRestriction >= 0)
        {
            source = source.Where(m => m.AgeRestriction.MinAge == query.AgeRestriction);
        }

        if (query.Date.Date != new DateTime(1970,1,1).Date)
        {
            source = source.Where(m => m.Seances.Any(s => s.StartDateTime.Date == query.Date.Date));
        }

        return source;
    }
}