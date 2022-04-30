using Domain.Services;
using Domain.Utils;

namespace Domain.Entities;

public class Order
{
    public int Id { get; private set; }
    public string Number { get; private set; }
    public DateTime DateTimeOfOrder { get; private set; }
    public ICollection<Ticket> Tickets { get; private set; }
    public AgeOffer? AgeOffer { get; private set; }
    public AmountOffer? AmountOffer { get; private set; }
    public MovieGenreOffer? MovieGenreOffer { get; private set; }

    private Order() { }

    private Order(DateTime dateOfOrder, ICollection<Ticket> tickets, AgeOffer? ageOffer = null, AmountOffer? amountOffer = null,
        MovieGenreOffer? movieGenreOffer = null)
    {
        DateTimeOfOrder = dateOfOrder;
        Tickets = tickets;
        var rand = new Random();
        Number = UserFriendlyNumberGenerator.Generate(Tickets.First().Id, DateTime.Now.ToUnixMilliseconds(),
            rand.Next(0, 10));
        AgeOffer = ageOffer;
        AmountOffer = amountOffer;
        MovieGenreOffer = movieGenreOffer;
    }

    public static Order Create(DateTime dateOfOrder, ICollection<Ticket> tickets,  AgeOffer? ageOffer = null, AmountOffer? amountOffer = null,
        MovieGenreOffer? movieGenreOffer = null)
    {
        return new Order(dateOfOrder, tickets, ageOffer, amountOffer, movieGenreOffer);
    }

    public string? GetOfferName()
    {
        if (AgeOffer is not null)
        {
            return AgeOffer.Name;
        }

        if (AmountOffer is not null)
        {
            return AmountOffer.Name;
        }

        if (MovieGenreOffer is not null)
        {
            return MovieGenreOffer.Name;
        }

        return null;
    }
}