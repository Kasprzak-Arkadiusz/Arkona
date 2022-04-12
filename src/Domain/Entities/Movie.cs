namespace Domain.Entities;

public class Movie
{
    public int Id { get; private set; }
    public byte[]? Image { get; private set; }
    public string Title { get; private set; }
    public DateOnly ReleaseDate { get; private set; }
    public short Duration { get; private set; }
    public string Description { get; private set; }
    public AgeConstraint? AgeConstraint { get; private set; }
    public ICollection<MovieGenre>? MovieGenres { get; private set; }
    public ICollection<Seance> Seances { get; private set; }

    private Movie() { }

    private Movie(string title, DateOnly releaseDate, short duration,
        string description, AgeConstraint? ageConstraint, ICollection<MovieGenre>? movieGenres, byte[]? image = null)
    {
        Title = title;
        ReleaseDate = releaseDate;
        Duration = duration;
        Description = description;
        AgeConstraint = ageConstraint;
        MovieGenres = movieGenres;
        Seances = new List<Seance>();
        Image = image;
    }

    public static Movie Create(string title, DateOnly releaseDate, short duration,
        string description, ICollection<MovieGenre>? movieGenres = null, byte[]? image = null,
        AgeConstraint? ageConstraint = null)
    {
        return new Movie(title, releaseDate, duration, description, ageConstraint, movieGenres, image);
    }

    public void Update(string? title = null, DateOnly? releaseDate = null, short? duration = null,
        string? description = null, AgeConstraint? ageConstraint = null, ICollection<MovieGenre>? movieGenres = null,
        byte[]? image = null)
    {
        Title = title ?? Title;
        ReleaseDate = releaseDate ?? ReleaseDate;
        Duration = duration ?? Duration;
        Description = description ?? Description;
        AgeConstraint = ageConstraint ?? AgeConstraint;
        MovieGenres = movieGenres ?? MovieGenres;
        Image = image ?? Image;
    }
}