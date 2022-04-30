using Domain.Enums;

namespace Domain.Entities;

public class Genre
{
    public GenreId Id { get; private set; }
    public string Name { get; private set; }

    public ICollection<MovieGenre> MovieGenres { get; set; }
    public MovieGenreOffer MovieGenreOffer { get; set; }

    private Genre(GenreId id, string name)
    {
        Id = id;
        Name = name;
    }
    
    public static Genre Create(GenreId id, string name)
    {
        return new Genre(id, name);
    }
}