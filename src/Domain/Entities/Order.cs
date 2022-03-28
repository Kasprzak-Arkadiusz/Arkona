namespace Domain.Entities;

public class Order
{
    public int Id { get; private set; }
    public string Number { get; private set; }
    public DateTime DateTimeOfOrder { get; private set; }
    public ICollection<Ticket> Tickets { get; set; }
    public AgeOffer? AgeOffer { get; set; }
    public AmountOffer? AmountOffer { get; set; }
    public MovieGenreOffer? MovieGenreOffer { get; set; }

    private Order() { }
    
    public Order(DateTime dateOfOrder)
    {
        DateTimeOfOrder = dateOfOrder;
    }
}