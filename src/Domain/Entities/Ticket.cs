using Domain.ValueObjects;

namespace Domain.Entities;

public class Ticket
{
    public int Id { get; private set; }
    public string Number { get; private set; }
    public Price Price { get; private set; }

    public Ticket(Price price)
    {
        Price = price;
        Number = Id.ToString("N9");
    }
}