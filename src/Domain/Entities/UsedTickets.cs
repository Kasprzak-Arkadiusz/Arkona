using Domain.ValueObjects;

namespace Domain.Entities;

public class UsedTickets
{
    public int Id { get; private set; }
    public int Number { get; set; }
    public string MovieTitle { get; set; }
    public DateTime SeanceDateTime { get; set; }
    public Price Price { get; set; }
    public string DiscountName { get; set; }
    public string OfferName { get; set; }

    public UsedTickets(int number, string movieTitle, DateTime seanceDateTime,
        Price price, string discountName, string offerName)
    {
        Number = number;
        MovieTitle = movieTitle;
        SeanceDateTime = seanceDateTime;
        Price = price;
        DiscountName = discountName;
        OfferName = offerName;
    }
}