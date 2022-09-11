using Application.Offers.Queries;
using Google.Protobuf;
using Grpc.Core;
using MediatR;

namespace API.Services;

public class OfferService : Offer.OfferBase
{
    private readonly IMediator _mediator;

    public OfferService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public override async Task<GetLatestOffersResponse> GetLatestOffers(GetLatestOffersRequest request, ServerCallContext context)
    {
        var viewModel = await _mediator.Send(new GetLatestOffersQuery((short)request.Count));
        var response = new GetLatestOffersResponse();
        response.Offers.AddRange(viewModel.Select(i => new GeneralOfferInfo
        {
            Id = i.Id,
            Image = ByteString.CopyFrom(i.Image),
            Name = i.Name
        }));

        return response;
    }

    public override async Task<GetAvailableOffersResponse> GetAvailableOffers(GetAvailableOffersRequest request, ServerCallContext context)
    {
        var viewModel = await _mediator.Send(new GetAvailableOffersQuery(request.SeanceId));
        var response = new GetAvailableOffersResponse();
        response.Offers.AddRange(viewModel.Select(aoi => new AvailableOfferInfo
        {
            Id = aoi.Id,
            Name = aoi.Name,
            Description = aoi.Description,
            MinTickets = aoi.MinTickets
        }));
        
        return response;
    }
}