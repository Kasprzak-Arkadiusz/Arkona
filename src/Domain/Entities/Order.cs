namespace Domain.Entities;

public class Order
{
    public int Id { get; private set; }

    // TODO Calculate number based on id in a separate service
    public string Number { get; private set; }
    public DateTime DateTimeOfOrder { get; private set; }
    public ICollection<Ticket> Tickets { get; private set; }
    public AgeOffer? AgeOffer { get; private set; }
    public AmountOffer? AmountOffer { get; private set; }
    public MovieGenreOffer? MovieGenreOffer { get; private set; }

    private Order(DateTime dateOfOrder, AgeOffer? ageOffer = null, AmountOffer? amountOffer = null,
        MovieGenreOffer? movieGenreOffer = null)
    {
        DateTimeOfOrder = dateOfOrder;
        Tickets = new List<Ticket>();
        AgeOffer = ageOffer;
        AmountOffer = amountOffer;
        MovieGenreOffer = movieGenreOffer;
    }

    public static Order Create(DateTime dateOfOrder, AgeOffer? ageOffer = null, AmountOffer? amountOffer = null,
        MovieGenreOffer? movieGenreOffer = null)
    {
        return new Order(dateOfOrder, ageOffer, amountOffer, movieGenreOffer);
    }
}