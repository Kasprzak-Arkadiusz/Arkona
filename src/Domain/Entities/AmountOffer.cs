using Domain.ValueObjects;

namespace Domain.Entities;

public class AmountOffer : Offer
{
    public byte RequiredNumberOfTickets { get; private set; }
    public byte DiscountedNumberOfTickets { get; private set; }
    public IEnumerable<Order>? Orders { get; }

    private AmountOffer() { }

    private AmountOffer(string name, string description, decimal discountValue, byte requiredNumberOfTickets,
        byte discountedNumberOfTickets, Period validPeriod) : base(name, description, discountValue, validPeriod)
    {
        RequiredNumberOfTickets = requiredNumberOfTickets;
        DiscountedNumberOfTickets = discountedNumberOfTickets;
        Orders = new List<Order>();
    }

    public static AmountOffer Create(string name, string description, decimal discountValue,
        byte requiredNumberOfTickets, byte discountedNumberOfTickets, Period validPeriod)
    {
        return new AmountOffer(name, description, discountValue, requiredNumberOfTickets, discountedNumberOfTickets,
            validPeriod);
    }
}