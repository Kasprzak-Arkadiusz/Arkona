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
}