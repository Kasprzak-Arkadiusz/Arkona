using Domain.Common;
using Domain.Entities;
using Domain.ValueObjects;

namespace Domain.Services;

public static class TicketPriceCalculator
{
    public static decimal CalculatePrice(IList<SelectedTicket> tickets, Offer? offer)
    {
        if (offer is not null)
        {
            return offer.GetPriceAfterDiscount(tickets);
        }

        return (from ticket in tickets
            let price = Price.Create(ticket.Discount.DiscountValue)
            select ticket.Count * price.DiscountedPrice).Sum();
        ;
    }
}