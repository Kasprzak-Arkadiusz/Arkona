namespace Domain.Common;

public class SelectedTicket
{
    public decimal DiscountValue { get; init; }
    public byte Count { get; init; }

    public SelectedTicket(decimal discountValue, byte count)
    {
        DiscountValue = discountValue;
        Count = count;
    }
}