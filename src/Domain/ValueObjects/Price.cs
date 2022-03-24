namespace Domain.ValueObjects;

public record Price(decimal BasePrice, decimal DiscountedPrice)
{
    public decimal BasePrice { get; private set; } = BasePrice;
    public decimal DiscountedPrice { get; private set; } = DiscountedPrice;
}