namespace Domain.Entities;

public abstract class Offer
{
    public short Id { get; private set; }
    public string Name { get; private set; }
    
    // TODO Extract to ValueObject
    public DateOnly ValidFrom { get; private set; }
    public DateOnly ValidTo { get; private set; }
    
    public string Description { get; private set; }
    public decimal DiscountValue { get; private set; }

    protected Offer(string name, string description, decimal discountValue, DateOnly validFrom, DateOnly validTo)
    {
        Name = name;
        Description = description;
        DiscountValue = discountValue;
        ValidFrom = validFrom;
        ValidTo = validTo;
    }

    protected void ExtendTheOffer(DateOnly validTo)
    {
        ValidTo = validTo;
    }
}