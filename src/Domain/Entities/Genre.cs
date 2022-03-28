using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Genre
{
    public byte Id { get; private set; }
    public string Name { get; private set; }

    public ICollection<MovieGenre> MovieGenres { get; set; }
    public MovieGenreOffer MovieGenreOffer { get; set; }

    public Genre(string name)
    {
        Name = name;
    }
}