namespace Domain.ValueObjects;

public record Price
{
    public decimal BasePrice { get; private set; } = new(20.00);
    public decimal DiscountedPrice { get; private set; }

    private Price() { }

    private Price(decimal discountValue)
    {
        ApplyDiscount(discountValue);
    }

    public static Price Create(decimal? discountValue = null)
    {
        return discountValue is null ? new Price(0) : new Price(discountValue.Value);
    }
    
    public void ApplyDiscount(decimal discountValue)
    {
        if (discountValue is > 0 and < 1)
        {
            DiscountedPrice = BasePrice * discountValue;
            return;
        }

        DiscountedPrice = BasePrice;
    }
}