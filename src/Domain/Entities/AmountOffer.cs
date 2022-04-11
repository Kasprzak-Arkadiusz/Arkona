namespace Domain.Entities;

public class AmountOffer : Offer
{
    public byte RequiredNumberOfTickets { get; private set; }
    public byte DiscountedNumberOfTickets { get; private set; }
    public IEnumerable<Order>? Orders { get; }

    private AmountOffer(string name, string description, decimal discountValue, byte requiredNumberOfTickets,
        byte discountedNumberOfTickets, DateOnly validFrom, DateOnly validTo) : base(name, description, discountValue,
        validFrom, validTo)
    {
        RequiredNumberOfTickets = requiredNumberOfTickets;
        DiscountedNumberOfTickets = discountedNumberOfTickets;
        Orders = new List<Order>();
    }

    public static AmountOffer Create(string name, string description, decimal discountValue,
        byte requiredNumberOfTickets, byte discountedNumberOfTickets, DateOnly validFrom, DateOnly validTo)
    {
        return new AmountOffer(name, description, discountValue, requiredNumberOfTickets, discountedNumberOfTickets,
            validFrom, validTo);
    }
}