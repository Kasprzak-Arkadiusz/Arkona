namespace Application.Movies.ViewModels;

public class MovieInfo
{
    public int Id { get; set; }
    public byte[]? Image { get; set; }
    public string Title { get; set; }
    public DateOnly ReleaseDate { get; set; }
    public short Duration { get; set; }
    public List<string> Genres { get; set; }
    public string AgeRestriction { get; set; }

    public MovieInfo() { }
}