using Domain.ValueObjects;

namespace Domain.Entities;

public class UsedTicket
{
    public int Id { get; private set; }
    public string Number { get; }
    public string MovieTitle { get; }
    public DateTime SeanceDateTime { get; }
    public Price Price { get; }
    public string DiscountName { get; }
    public string OfferName { get; }

    private UsedTicket() { }

    private UsedTicket(string number, string movieTitle, DateTime seanceDateTime,
        Price price, string discountName, string offerName)
    {
        Number = number;
        MovieTitle = movieTitle;
        SeanceDateTime = seanceDateTime;
        Price = price;
        DiscountName = discountName;
        OfferName = offerName;
    }

    public static UsedTicket Create(string number, string movieTitle, DateTime seanceDateTime,
        Price price, string discountName, string offerName)
    {
        return new UsedTicket(number, movieTitle, seanceDateTime, price, discountName, offerName);
    }
}