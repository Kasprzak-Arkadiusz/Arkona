using Application.Movies.Queries;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Grpc.Core;
using MediatR;

namespace API.Services;

public class MovieService : Movie.MovieBase
{
    private readonly IMediator _mediator;

    public MovieService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public override async Task<GetMoviesResponse> GetMovies(GetMoviesRequest request, ServerCallContext context)
    {
        var paginatedList = await _mediator.Send(new GetMoviesQuery(request.PageNumber, request.PageSize));
        var response = new GetMoviesResponse
        {
            PageNumber = paginatedList.PageNumber,
            HasNextPage = paginatedList.HasNextPage
        };

        response.Items.AddRange(paginatedList.Items.Select(i => new MovieInfo
        {
            Id = i.Id,
            Image = ByteString.CopyFrom(i.Image),
            Title = i.Title,
            AgeRestriction = i.AgeRestriction,
            ReleaseDate = Timestamp.FromDateTime(
                    (DateTime.SpecifyKind(i.ReleaseDate.ToDateTime(new TimeOnly()), DateTimeKind.Utc))),
            Duration = i.Duration
        }));

        foreach (var movieInfo in response.Items)
        {
            movieInfo.Genres.AddRange(paginatedList.Items
                .First(i => i.Id == movieInfo.Id).Genres
                .Select(g => g));
        }

        return response;
    }

    public override async Task<GetLatestMoviesResponse> GetLatestMovies(GetLatestMoviesRequest request,
        ServerCallContext context)
    {
        var movieInfo = await _mediator.Send(new GetLatestMoviesQuery(request.Count));

        var response = new GetLatestMoviesResponse();
        response.Items.AddRange(movieInfo.Select(m => new GeneralMovieInfo
        {
            Id = m.Id,
            Title = m.Title,
            Image = ByteString.CopyFrom(m.Image)
        }));

        return response;
    }
}