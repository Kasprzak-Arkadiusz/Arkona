using Domain.Enums;

namespace Domain.Entities;

public class MovieGenre
{
    public GenreId GenreId { get;  set; }
    public Genre Genre { get; set; }
    public int MovieId { get; set; }
    public Movie Movie { get; set; }
}