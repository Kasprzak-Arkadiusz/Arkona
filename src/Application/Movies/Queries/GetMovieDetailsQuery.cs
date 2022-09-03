using Application.Common.Exceptions;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.Movies.ViewModels;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Movies.Queries;

public class GetMovieDetailsQuery : IRequest<DetailedMovieInfo>
{
    public int Id { get; }

    public GetMovieDetailsQuery(int id)
    {
        Id = id;
    }
}

public class GetMovieDetailsQueryHandler : IRequestHandler<GetMovieDetailsQuery, DetailedMovieInfo>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IMapper _mapper;

    public GetMovieDetailsQueryHandler(IApplicationDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<DetailedMovieInfo> Handle(GetMovieDetailsQuery query, CancellationToken cancellationToken)
    {
        var movie = await _dbContext.Movies
            .Include(m => m.AgeRestriction)
            .Include(m => m.MovieGenres)
            .ThenInclude(mg => mg.Genre)
            .FirstOrDefaultAsync(m => m.Id == query.Id, cancellationToken);

        if (movie is null)
        {
            throw new NotFoundException("Movie with given id does not exist.");
        }

        var detailedMovieInfo = _mapper.Map<DetailedMovieInfo>(movie);
        return detailedMovieInfo;
    }
}