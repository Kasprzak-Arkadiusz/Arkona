using Domain.ValueObjects;

namespace Domain.Entities;

public class MovieGenreOffer : Offer
{
    public Genre MovieGenre { get; private set; }
    public ICollection<Order>? Orders { get; set; }

    private MovieGenreOffer() { }
    public MovieGenreOffer(string name, string description, decimal discountValue, Genre movieGenre) 
        : base(name, description, discountValue)
    {
        MovieGenre = movieGenre;
    }
}