namespace Domain.Entities;

public class Movie
{
    public int Id { get; private set; }
    public string Title { get; private set; }
    public DateOnly Date { get; private set; }
    public short Duration { get; private set; }
    public string Description { get; private set; }

    public Movie(string title, DateOnly date, short duration, string description)
    {
        Title = title;
        Date = date;
        Duration = duration;
        Description = description;
    }
}