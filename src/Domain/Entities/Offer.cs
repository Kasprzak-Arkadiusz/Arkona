using Domain.ValueObjects;

namespace Domain.Entities;

public abstract class Offer
{
    public short Id { get; private set; }
    public string Name { get; private set; }
    public Period ValidPeriod { get; private set; }
    public string Description { get; private set; }
    public decimal DiscountValue { get; private set; }

    protected Offer() { }

    protected Offer(string name, string description, decimal discountValue, Period validPeriod)
    {
        Name = name;
        Description = description;
        DiscountValue = discountValue;
        ValidPeriod = validPeriod;
        ValidPeriod = validPeriod;
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