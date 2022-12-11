using Domain.Enums;

namespace Domain.Entities;

public class MovieGenre
{
    public GenreId GenreId { get; set; }
    public Genre Genre { get; set; }
    public int MovieId { get; set; }
    public Movie Movie { get; set; }

    private MovieGenre() { }

    private MovieGenre(Genre genre, Movie movie)
    {
        GenreId = genre.Id;
        Genre = genre;
        Movie = movie;
        MovieId = movie.Id;
    }

    public static MovieGenre Create(Genre genre, Movie movie)
    {
        return new MovieGenre(genre, movie);
    }
}