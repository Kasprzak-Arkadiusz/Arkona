using Domain.ValueObjects;

namespace Domain.Entities;

public class UsedTicket
{
    public int Id { get; private set; }
    public string Number { get; set; }
    public string MovieTitle { get; set; }
    public DateTime SeanceDateTime { get; set; }
    public Price Price { get; set; }
    public string DiscountName { get; set; }
    public string OfferName { get; set; }

    private UsedTicket() {}

    public UsedTicket(string number, string movieTitle, DateTime seanceDateTime,
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