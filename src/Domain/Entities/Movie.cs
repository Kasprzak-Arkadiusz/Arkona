namespace Domain.Entities;

public class Movie
{
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
        string description, AgeRestriction ageRestriction, ICollection<MovieGenre> movieGenres, byte[] image)
    {
        Title = title;
        ReleaseDate = releaseDate;
        Duration = duration;
        Description = description;
        AgeRestriction = ageRestriction;
        MovieGenres = movieGenres;
        Seances = new List<Seance>();
        Image = image;
    }

    public static Movie Create(string title, DateOnly releaseDate, short duration,
        string description, ICollection<MovieGenre> movieGenres, byte[] image,
        AgeRestriction ageRestriction)
    {
        return new Movie(title, releaseDate, duration, description, ageRestriction, movieGenres, image);
    }
}