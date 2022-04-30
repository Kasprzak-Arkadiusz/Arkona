using Domain.Services;
using Domain.ValueObjects;

namespace Domain.Entities;

public class Ticket
{
    public int Id { get; private set; }
    public string Number { get; private set; }
    public Price Price { get; private set; }
    public TicketDiscount? TicketDiscount { get; private set; }
    public int SeanceSeatId { get; private set; }
    public SeanceSeat SeanceSeat { get; private set; }
    public Order Order { get; }

    private Ticket(SeanceSeat seanceSeat, TicketDiscount? ticketDiscount = null)
    {
        Price = Price.Create(ticketDiscount?.DiscountValue);
        SeanceSeat = seanceSeat;
        TicketDiscount = ticketDiscount;

        var rand = new Random();
        Number = UserFriendlyNumberGenerator.Generate(SeanceSeat.Id, DateTime.Now.Millisecond, rand.Next(0, 10));
    }

    public static Ticket Create(SeanceSeat seanceSeat, TicketDiscount? ticketDiscount = null)
    {
        return new Ticket(seanceSeat, ticketDiscount);
    }
}