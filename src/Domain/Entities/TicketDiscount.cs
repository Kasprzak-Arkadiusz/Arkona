namespace Domain.Entities;

public class TicketDiscount
{
    public byte Id { get; private set; }
    public string Name { get; private set; }
    public string Description { get; private set; }
    public decimal DiscountValue { get; private set; }
    public ICollection<Ticket> Tickets { get; private set; }

    private TicketDiscount(string name, string description, decimal discountValue)
    {
        Name = name;
        Description = description;
        DiscountValue = discountValue;
        Tickets = new List<Ticket>();
    }

    public static TicketDiscount Create(string name, string description, decimal discountValue)
    {
        return new TicketDiscount(name, description, discountValue);
    }
}