using API.Validators.Orders;
using Application.Orders.Commands;
using Application.Orders.Queries;
using Application.Orders.ViewModels;
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
        var ticketDiscountVm = request.SelectedTickets.Select(st =>
            new TicketDiscountVm
            {
                DiscountId = st.DiscountId,
                Count = st.Count
            }).ToList();

        var totalPrice = await _mediator.Send(new GetTotalPriceQuery(ticketDiscountVm, request.OfferId));
        var response = new GetTotalPriceResponse
        {
            Price = (float)totalPrice
        };
        return response;
    }

    public override async Task<FinalizeOrderResponse> FinalizeOrder(FinalizeOrderRequest request,
        ServerCallContext context)
    {
        FinalizeOrderValidator.Validate(request);

        var ticketDiscountVm = request.SelectedTickets.Select(st =>
            new TicketDiscountVm
            {
                DiscountId = st.DiscountId,
                Count = st.Count
            }).ToList();

        await _mediator.Send(new FinalizeOrderCommand(ticketDiscountVm, request.SeatIds.ToList(), request.UserId,
            request.OfferId));

        return new FinalizeOrderResponse();
    }
}