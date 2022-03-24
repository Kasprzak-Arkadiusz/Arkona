namespace Domain.ValueObjects;

public record TicketDiscount(string Name, string Description, decimal DiscountValue)
{
    public string Name { get; private set; } = Name;
    public string Description { get; private set; } = Description;
    public decimal DiscountValue { get; private set; } = DiscountValue;
}