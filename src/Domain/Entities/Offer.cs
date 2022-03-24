namespace Domain.Entities;

public abstract class Offer
{
    public short Id { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public decimal DiscountValue { get; private set; }

    protected Offer(string name, string description, decimal discountValue)
    {
        Name = name;
        Description = description;
        DiscountValue = discountValue;
    }
}