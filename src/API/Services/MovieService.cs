using Application.Common.Models;
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

    private static GetMoviesResponse ToGetMoviesResponse(
        PaginatedList<Application.Movies.ViewModels.MovieInfo> paginatedList)
    {
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
                DateTime.SpecifyKind(i.ReleaseDate.ToDateTime(new TimeOnly()), DateTimeKind.Utc)),
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

    public override async Task<GetMoviesResponse> GetMovies(GetMoviesRequest request, ServerCallContext context)
    {
        var paginatedList = await _mediator.Send(new GetMoviesQuery(request.PageNumber, request.PageSize));
        var response = ToGetMoviesResponse(paginatedList);

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

    public override async Task<GetMoviesResponse> GetFilteredMovies(GetFilteredMoviesRequest request,
        ServerCallContext context)
    {
        var paginatedList = await _mediator.Send(new GetFilteredMoviesQuery(request.Title, request.Genre,
            request.AgeRestriction, request.Date == null ? new DateTime(1970, 1, 1) : request.Date.ToDateTime(),
            request.PageNumber, request.PageSize));

        var response = ToGetMoviesResponse(paginatedList);
        return response;
    }

    public override async Task<DetailedMovieInfo> GetMovieDetails(GetMovieDetailsRequest request,
        ServerCallContext context)
    {
        var detailedMovieInfo = await _mediator.Send(new GetMovieDetailsQuery(request.Id));

        var response = new DetailedMovieInfo
        {
            Id = detailedMovieInfo.Id,
            Title = detailedMovieInfo.Title,
            AgeRestriction = detailedMovieInfo.AgeRestriction,
            ReleaseDate = Timestamp.FromDateTime(
                DateTime.SpecifyKind(detailedMovieInfo.ReleaseDate.ToDateTime(new TimeOnly()), DateTimeKind.Utc)),
            Duration = detailedMovieInfo.Duration,
            Image = ByteString.CopyFrom(detailedMovieInfo.Image),
            Description = detailedMovieInfo.Description
        };

        response.Genres.AddRange(detailedMovieInfo.Genres);
        return response;
    }
}