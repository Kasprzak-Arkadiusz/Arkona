namespace Domain.Entities;

public class MovieGenreOffer : Offer
{
    public byte GenreId { get; set; }
    public Genre Genre { get; private set; }
    public ICollection<Order> Orders { get; private set; }

    private MovieGenreOffer(string name, string description, decimal discountValue, Genre genre, DateOnly validFrom,
        DateOnly validTo) : base(name, description, discountValue, validFrom, validTo)
    {
        Genre = genre;
        Orders = new List<Order>();
    }

    public static MovieGenreOffer Create(string name, string description, decimal discountValue, Genre genre,
        DateOnly validFrom, DateOnly validTo)
    {
        return new MovieGenreOffer(name, description, discountValue, genre, validFrom, validTo);
    }
}