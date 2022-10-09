using Application.Orders.Queries;
using Grpc.Core;
using MediatR;

namespace API.Services;

public class OrderService : Order.OrderBase
{
    private readonly IMediator _mediator;

    public OrderService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public override async Task<GetTotalPriceResponse> GetTotalPrice(GetTotalPriceRequest request,
        ServerCallContext context)
    {
        var selectedTickets = request.SelectedTickets.Select(st =>
            new Domain.Common.SelectedTicket(Convert.ToDecimal(st.DiscountValue), (byte)st.Count)).ToList();

        var totalPrice = await _mediator.Send(new GetTotalPriceQuery(selectedTickets, request.OfferId));
        var response = new GetTotalPriceResponse
        {
            Price = (float)totalPrice
        };
        return response;
    }
}