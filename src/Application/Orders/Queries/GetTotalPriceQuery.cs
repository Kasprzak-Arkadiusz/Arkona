using Application.Common.Interfaces.IApplicationDBContext;
using Application.Orders.ViewModels;
using Domain.Common;
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

    private async Task<List<SelectedTicket>> ToSelectedTicketListAsync(List<TicketDiscountVm> ticketDiscountVms,
        CancellationToken cancellationToken)
    {
        var selectedTickets = await _dbContext.TicketDiscounts.Select(td => new SelectedTicket
        (
            td, (byte)ticketDiscountVms.Find(vm => vm.DiscountId == td.Id).Count
        )).ToListAsync(cancellationToken);

        return selectedTickets;
    }
}