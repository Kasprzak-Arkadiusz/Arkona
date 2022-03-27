using Domain.ValueObjects;

namespace Domain.Entities;

public class MovieGenreOffer : Offer
{
    public byte GenreId { get; set; }
    public Genre Genre { get; private set; }
    public ICollection<Order>? Orders { get; set; }

    private MovieGenreOffer() { }
    public MovieGenreOffer(string name, string description, decimal discountValue, Genre genre) 
        : base(name, description, discountValue)
    {
        Genre = genre;
    }
}