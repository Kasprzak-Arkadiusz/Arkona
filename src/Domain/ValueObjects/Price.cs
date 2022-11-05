using System.Globalization;

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

    public static string PriceToString(decimal price)
    {
        return $"{price.ToString(CultureInfo.CurrentCulture)} zł";
    }

    public static decimal ApplyDiscount(decimal discountValue, decimal price)
    {
        if (discountValue is > 0 and < 1)
        {
            return price * discountValue;
        }

        return price;
    }
}