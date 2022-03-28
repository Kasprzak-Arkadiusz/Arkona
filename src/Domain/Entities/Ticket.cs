using Domain.ValueObjects;

namespace Domain.Entities;

public class Ticket
{
    public int Id { get; private set; }
    public string Number { get; private set; }
    public Price Price { get; private set; }
    public TicketDiscount? TicketDiscount { get; private set; }
    public int SeatId { get; set; }
    public Seat Seat { get; set; }
    public Seance Seance { get; set; }
    public Order Order { get; set; }

    private Ticket() { }
    public Ticket(Price price, TicketDiscount ticketDiscount)
    {
        Price = price;
        TicketDiscount = ticketDiscount;
    }
}