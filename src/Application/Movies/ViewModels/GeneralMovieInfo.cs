namespace Application.Movies.ViewModels;

public class GeneralMovieInfo
{
    public int Id { get; set; }
    public string Title { get; set; }
    public byte[]? Image { get; set; }

    public GeneralMovieInfo(int id, string title, byte[]? image)
    {
        Id = id;
        Title = title;
        Image = image;
    }
}