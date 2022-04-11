namespace Domain.Entities;

public class MovieGenre
{
    public byte GenreId { get; private set; }
    public Genre Genre { get; private set; }
    public int MovieId { get; private set; }
    public Movie Movie { get; private set; }
}