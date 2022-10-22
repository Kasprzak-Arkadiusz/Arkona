using Domain.Entities;

namespace Domain.Common;

public class SelectedTicket
{
    public TicketDiscount Discount { get; init; }
    public byte Count { get; init; }

    public SelectedTicket()
    {
        
    }
    
    public SelectedTicket(TicketDiscount discount, byte count)
    {
        Discount = discount;
        Count = count;
    }
}