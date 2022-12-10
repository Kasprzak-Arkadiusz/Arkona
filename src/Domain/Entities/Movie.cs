namespace Domain.Entities;

public class Movie
{
    public const int MaxTitleLength = 100;
    public const short MaxDurationInMinutes = 300;
    public const int MaxDescriptionLength = 1000;

    public int Id { get; private set; }
    public byte[]? Image { get; private set; }
    public string Title { get; private set; }
    public DateOnly ReleaseDate { get; private set; }
    public short Duration { get; private set; }
    public string Description { get; private set; }
    public AgeRestriction AgeRestriction { get; private set; }
    public ICollection<MovieGenre> MovieGenres { get; private set; }
    public ICollection<Seance> Seances { get; private set; }

    private Movie() { }

    private Movie(string title, DateOnly releaseDate, short duration,
        string description, AgeRestriction ageRestriction, IEnumerable<Genre> genres, byte[]? image = null)
    {
        Title = title;
        ReleaseDate = releaseDate;
        Duration = duration > MaxDurationInMinutes ? MaxDurationInMinutes : duration;
        Description = description;
        AgeRestriction = ageRestriction;
        MovieGenres = genres.Select(genre => MovieGenre.Create(genre, this)).ToList();
        Seances = new List<Seance>();
        Image = image;
    }

    public static Movie Create(string title, DateOnly releaseDate, short duration,
        string description, AgeRestriction ageRestriction, IEnumerable<Genre> movieGenres, byte[]? image = null
        )
    {
        return new Movie(title, releaseDate, duration, description, ageRestriction, movieGenres, image);
    }
}