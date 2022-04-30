namespace Domain.ValueObjects;

public record Price
{
    public decimal BasePrice { get; private set; }
    public decimal DiscountedPrice { get; private set; }

    private Price() { }

    private Price(decimal? discountValue)
    {
        // TODO Get base price from Settings
        BasePrice = new decimal(20.00);
        DiscountedPrice = discountValue.HasValue ? BasePrice * discountValue.Value : BasePrice;
    }

    public static Price Create(decimal? discountValue)
    {
        return new Price(discountValue);
    }
}