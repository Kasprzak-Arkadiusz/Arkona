namespace Domain.Entities;

public class Genre
{
    public byte Id { get; private set; }
    public string Name { get; private set; }

    public ICollection<MovieGenre> MovieGenres { get; private set; }
    public MovieGenreOffer? MovieGenreOffer { get; private set; }

    private Genre(string name)
    {
        Name = name;
        MovieGenres = new List<MovieGenre>();
    }

    public static Genre Create(string name)
    {
        // Validation
        return new Genre(name);
    }

    public void Rename(string newName)
    {
        Name = newName;
    }
}