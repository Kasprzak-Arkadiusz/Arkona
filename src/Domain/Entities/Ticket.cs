using Domain.ValueObjects;

namespace Domain.Entities;

public class Ticket
{
    public int Id { get; private set; }
    
    // TODO Calculate number based on id in a separate service
    public string Number { get; private set; }
    public Price Price { get; private set; }
    public TicketDiscount? TicketDiscount { get; private set; }
    public int SeanceSeatId { get; private set; }
    public SeanceSeat SeanceSeat { get; private set; }
    public Order Order { get; private set; }
  
    private Ticket(SeanceSeat seanceSeat, TicketDiscount? ticketDiscount = null)
    {
        Price = Price.Create(ticketDiscount?.DiscountValue);
        SeanceSeat = seanceSeat;
        TicketDiscount = ticketDiscount;
    }

    public static Ticket Create(SeanceSeat seanceSeat, TicketDiscount? ticketDiscount = null)
    {
        return new Ticket(seanceSeat, ticketDiscount);
    }
}