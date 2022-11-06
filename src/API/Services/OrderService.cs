using System.Globalization;
using API.Common.Utils;
using API.Validators.Orders;
using Application.Orders.Commands;
using Application.Orders.Queries;
using Application.Orders.ViewModels;
using Domain.ValueObjects;
using Grpc.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace API.Services;

[Authorize]
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

    public override async Task<GetUserOrdersResponse> GetUserOrders(GetUserOrdersRequest request,
        ServerCallContext context)
    {
        var orderDetailsVms = await _mediator.Send(new GetUserOrdersQuery(CurrentUserManager.GetUserId(context)));

        var response = new GetUserOrdersResponse();
        response.Orders.AddRange(orderDetailsVms.Select(vm => new UserOrderDetails
        {
            OrderNumber = vm.OrderNumber,
            DateOfPurchase = vm.DateOfPurchase.ToString(CultureInfo.CurrentCulture),
            MovieTitle = vm.MovieTitle,
            DateOfSeance = vm.DateOfSeance.ToString(CultureInfo.CurrentCulture),
            TotalPrice = Price.PriceToString(vm.TotalPrice),
            HallNumber = vm.HallNumber
        }));

        foreach (var order in response.Orders)
        {
            var tickets = orderDetailsVms.First(vm => vm.OrderNumber == order.OrderNumber).Tickets;
            order.Tickets.AddRange(tickets.Select(t => new TicketDetails
            {
                SeatNumber = t.SeatNumber,
                Price = t.Price,
                DiscountName = t.DiscountName
            }));
        }

        return response;
    }
}