using Application.Common.Interfaces.IApplicationDBContext;
using Application.Orders.ViewModels;
using Domain.Common;
using Domain.Entities;
using Domain.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Orders.Queries;

public class GetTotalPriceQuery : IRequest<decimal>
{
    public List<TicketDiscountVm> SelectedTickets { get; }
    public int OfferId { get; }

    public GetTotalPriceQuery(List<TicketDiscountVm> selectedTickets, int offerId)
    {
        SelectedTickets = selectedTickets;
        OfferId = offerId;
    }
}

public class GetTotalPriceQueryHandler : IRequestHandler<GetTotalPriceQuery, decimal>
{
    private readonly IApplicationDbContext _dbContext;

    public GetTotalPriceQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<decimal> Handle(GetTotalPriceQuery query, CancellationToken cancellationToken)
    {
        var offer = await _dbContext.Offers.FindAsync(new object[] { (short)query.OfferId },
            cancellationToken: cancellationToken);

        var selectedTickets = await ToSelectedTicketListAsync(query.SelectedTickets, cancellationToken);

        var totalPrice = TicketPriceCalculator.CalculatePrice(selectedTickets, offer);
        return totalPrice;
    }

    private async Task<List<SelectedTicket>> ToSelectedTicketListAsync(
        IReadOnlyCollection<TicketDiscountVm> ticketDiscountVms,
        CancellationToken cancellationToken)
    {
        var ticketDiscounts = await _dbContext.TicketDiscounts.ToListAsync(cancellationToken);

        return ticketDiscountVms.Select(ticketDiscountVm => new SelectedTicket
            {
                Discount = FindDiscountById(ticketDiscounts, ticketDiscountVm.DiscountId),
                Count = (byte)ticketDiscountVm.Count
            })
            .ToList();
    }

    private static TicketDiscount FindDiscountById(IReadOnlyCollection<TicketDiscount> ticketDiscounts, int discountId)
    {
        var discount = ticketDiscounts.FirstOrDefault(td => td.Id == discountId);
        return discount ?? ticketDiscounts.First(td => td.DiscountValue == 1);
    }
}