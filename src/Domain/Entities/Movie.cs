using Domain.ValueObjects;

namespace Domain.Entities;

public class Movie
{
    public int Id { get; private set; }
    public string Title { get; private set; }
    public DateOnly ReleaseDate { get; private set; }
    public short Duration { get; private set; }
    public string Description { get; private set; }
    public AgeConstraint AgeConstraint { get; private set; }
    public IList<MovieGenre> MovieGenres { get; private set; }
    public ICollection<Seance> Seances { get; set; }

    private Movie() { }
    
    public Movie(string title, DateOnly releaseDate, short duration,
        string description, AgeConstraint ageConstraint)
    {
        Title = title;
        ReleaseDate = releaseDate;
        Duration = duration;
        Description = description;
        AgeConstraint = ageConstraint;
    }
}