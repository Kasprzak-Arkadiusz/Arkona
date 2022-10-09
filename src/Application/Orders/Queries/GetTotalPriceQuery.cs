using Application.Common.Exceptions;
using Application.Common.Interfaces.IApplicationDBContext;
using Domain.Common;
using Domain.Services;
using MediatR;

namespace Application.Orders.Queries;

public class GetTotalPriceQuery : IRequest<decimal>
{
    public List<SelectedTicket> SelectedTickets { get; }
    public int OfferId { get; }

    public GetTotalPriceQuery(List<SelectedTicket> selectedTickets, int offerId)
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
        var offer = await _dbContext.Offers.FindAsync(new object[] { (short) query.OfferId },
            cancellationToken: cancellationToken);

        var totalPrice = TicketPriceCalculator.CalculatePrice(query.SelectedTickets, offer);
        return totalPrice;
    }
}