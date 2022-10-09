using Domain.Common;
using Domain.ValueObjects;

namespace Domain.Entities;

public class AmountOffer : Offer
{
    public byte RequiredNumberOfTickets { get; private set; }
    public byte DiscountedNumberOfTickets { get; private set; }

    private AmountOffer() { }

    private AmountOffer(string name, string description, decimal discountValue, byte requiredNumberOfTickets,
        byte discountedNumberOfTickets, Period validPeriod, byte[]? image = null)
        : base(name, description, discountValue, validPeriod, image)
    {
        RequiredNumberOfTickets = requiredNumberOfTickets;
        DiscountedNumberOfTickets = discountedNumberOfTickets;
    }

    public static AmountOffer Create(string name, string description, decimal discountValue,
        byte requiredNumberOfTickets, byte discountedNumberOfTickets, Period validPeriod, byte[]? image = null)
    {
        return new AmountOffer(name, description, discountValue, requiredNumberOfTickets, discountedNumberOfTickets,
            validPeriod, image);
    }

    public override void ApplyOffer(List<Ticket> tickets)
    {
        if (tickets.Count < RequiredNumberOfTickets)
        {
            return;
        }

        for (var i = 0; i < DiscountedNumberOfTickets; i++)
        {
            tickets[i].Price.ApplyDiscount(DiscountValue);
        }
    }

    public override decimal GetPriceAfterDiscount(IList<SelectedTicket> tickets)
    {
        var totalPrice = 0m;
        foreach (var ticket in tickets)
        {
            var price = Price.Create(ticket.DiscountValue);
            totalPrice += ticket.Count * price.DiscountedPrice;
        }

        var numberOfTickets = tickets.Sum(t => t.Count);
        if (numberOfTickets < RequiredNumberOfTickets)
        {
            return totalPrice;
        }

        var discounts = new List<decimal>();
        foreach (var ticket in tickets)
        {
            discounts.AddRange(Enumerable.Repeat(ticket.DiscountValue, ticket.Count));
        }

        var discountsStack = new Stack<decimal>(discounts.OrderByDescending(d => d));
        for (var i = 0; i < DiscountedNumberOfTickets; i++)
        {
            totalPrice -= Price.Create(discountsStack.Pop()).DiscountedPrice;
        }

        return totalPrice;
    }
}