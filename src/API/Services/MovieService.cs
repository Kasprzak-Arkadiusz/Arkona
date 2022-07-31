using Application.Movies.Queries;
using Google.Protobuf;
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
        var paginatedList =  await _mediator.Send(new GetMoviesQuery(request.PageNumber, request.PageSize));
        var response = new GetMoviesResponse
        {
            PageNumber = paginatedList.PageNumber,
            TotalPages = paginatedList.TotalPages,
            TotalCount = paginatedList.TotalCount,
            HasPreviousPage = paginatedList.HasPreviousPage,
            HasNextPage = paginatedList.HasNextPage
        };

        response.Items.AddRange(paginatedList.Items.Select(i => new GeneralMovieInfo
        {
            Id = i.Id,
            Image = ByteString.CopyFrom(i.Image),
            Title = i.Title
        }));

        return response;
    }
}