using Domain.Services;
using Domain.Utils;

namespace Domain.Entities;

public class Order
{
    public int Id { get; private set; }
    public string Number { get; private set; }
    public DateTime DateTimeOfOrder { get; private set; }
    public string UserId { get; private set; }
    public Offer? Offer { get; private set; }
    public ICollection<Ticket> Tickets { get; private set; }

    private Order() { }

    private Order(DateTime dateOfOrder, List<Ticket> tickets, string userId, Offer? offer = null)
    {
        Offer = offer;
        DateTimeOfOrder = dateOfOrder;
        UserId = userId;
        
        Tickets = tickets;
        offer?.ApplyOffer(tickets);

        var rand = new Random();
        Number = UserFriendlyNumberGenerator.Generate(Tickets.First().Id, DateTime.Now.ToUnixMilliseconds(),
            rand.Next(0, 10));
    }

    public static Order Create(DateTime dateOfOrder, List<Ticket> tickets, string userId,
        Offer? offer = null)
    {
        return new Order(dateOfOrder, tickets, userId, offer);
    }
}