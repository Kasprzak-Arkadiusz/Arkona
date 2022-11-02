using Domain.Common;
using Domain.ValueObjects;

namespace Domain.Entities;

public abstract class Offer
{
    public short Id { get; private set; }
    public byte[]? Image { get; private set; }
    public string Name { get; private set; }
    public Period ValidPeriod { get; private set; }
    public string Description { get; private set; }
    public decimal DiscountValue { get; private set; }
    public ICollection<Order> Orders { get; private set; }

    protected Offer() { }

    protected Offer(string name, string description, decimal discountValue, Period validPeriod, byte[]? image = null)
    {
        Name = name;
        Description = description;
        DiscountValue = discountValue;
        ValidPeriod = validPeriod;
        ValidPeriod = validPeriod;
        Orders = new List<Order>();
        Image = image;
    }

    public virtual void ApplyOffer(List<Ticket> tickets)
    {
        foreach (var ticket in tickets)
        {
            ticket.Price.ApplyDiscount(DiscountValue);
        }
    }

    public virtual decimal GetPriceAfterDiscount(IList<SelectedTicket> tickets)
    {
        var totalPrice = (from ticket in tickets
            let price = Price.Create(ticket.Discount.DiscountValue)
            select ticket.Count * price.DiscountedPrice).Sum();
        return totalPrice * DiscountValue;
    }

    protected void ExtendTheOffer(DateOnly validTo)
    {
        ValidPeriod.ExtendPeriod(validTo);
    }

    protected void ShortenTheOffer(DateOnly validTo)
    {
        ValidPeriod.ShortenPeriod(validTo);
    }
}