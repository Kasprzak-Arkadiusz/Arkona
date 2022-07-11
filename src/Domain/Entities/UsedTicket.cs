using Domain.ValueObjects;

namespace Domain.Entities;

public class UsedTicket
{
    public int Id { get; private set; }
    public string Number { get; }
    public string MovieTitle { get; }
    public DateTime SeanceDateTime { get; }
    public Price Price { get; }
    public string? DiscountName { get; }
    public string? OfferName { get; }
    public string UserId { get; }

    private UsedTicket() { }

    private UsedTicket(Ticket ticket, Seance seance)
    {
        Number = ticket.Number;
        MovieTitle = seance.Movie.Title;
        SeanceDateTime = seance.StartDateTime;
        Price = ticket.Price;
        DiscountName = ticket.TicketDiscount?.Name;
        OfferName = ticket.Order.Offer?.Name;
        UserId = ticket.Order.UserId;
    }
    
    private UsedTicket(string number, string userId, string movieTitle, DateTime seanceDateTime,
        Price price, string? discountName, string? offerName)
    {
        Number = number;
        UserId = userId;
        MovieTitle = movieTitle;
        SeanceDateTime = seanceDateTime;
        Price = price;
        DiscountName = discountName;
        OfferName = offerName;
    }

    public static UsedTicket Create(string number, string userId, string movieTitle, DateTime seanceDateTime,
        Price price, string? discountName, string? offerName)
    {
        return new UsedTicket(number, userId, movieTitle, seanceDateTime, price, discountName, offerName);
    }

    public static UsedTicket Create(Ticket ticket, Seance seance)
    {
        return new UsedTicket(ticket, seance);
    }
}