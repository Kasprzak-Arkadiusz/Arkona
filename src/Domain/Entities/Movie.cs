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

    public void Update(string? title = null, DateOnly? releaseDate = null, short? duration = null,
        string? description = null, AgeRestriction? ageRestriction = null, IList<Genre>? genres = null, byte[]? image = null)
    {
        Title = title ?? Title;
        ReleaseDate = releaseDate ?? ReleaseDate;
        Duration = duration ?? Duration;
        Description = description ?? Description;
        AgeRestriction = ageRestriction ?? AgeRestriction;
        ChangeMovieGenres(genres); 
            // genres?.Select(genre => MovieGenre.Create(genre, this)).ToList() ?? MovieGenres;
        Image = image ?? Image;
    }

    private void ChangeMovieGenres(IList<Genre>? newGenres)
    {
        if (newGenres is null || !newGenres.Any())
        {
            return;
        }
        
        // Get different movie genres
        var newGenreIds = newGenres.Select(ng => ng.Id).ToList();
        var oldGenreIds = MovieGenres.Select(mg => mg.GenreId).ToList();
        
        var newElementIds = newGenreIds.Except(oldGenreIds);
        var outdatedElementIds = oldGenreIds.Except(newGenreIds);

        var movieGenresToRemove = MovieGenres.Where(mg => outdatedElementIds.Contains(mg.GenreId));
        foreach (var movieGenre in movieGenresToRemove)
        {
            MovieGenres.Remove(movieGenre);
        }

        foreach (var id in newElementIds)
        {
            var genre = newGenres.First(ng => ng.Id == id);
            var movieGenre = MovieGenre.Create(genre, this);
            MovieGenres.Add(movieGenre);
        }
    }
}