using Domain.ValueObjects;

namespace Domain.Entities;

public class MovieGenreOffer : Offer
{
    public MovieGenre MovieGenre { get; private set; }
    
    public MovieGenreOffer(string name, string description, decimal discountValue, MovieGenre movieGenre) 
        : base(name, description, discountValue)
    {
        MovieGenre = movieGenre;
    }
}