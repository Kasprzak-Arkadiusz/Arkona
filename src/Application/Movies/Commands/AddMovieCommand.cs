using Application.Common.Exceptions;
using Application.Common.Interfaces.IApplicationDBContext;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Movies.Commands;

public class AddMovieCommand : IRequest
{
    public string Title { get; set; }
    public byte[] Image { get; set; }
    public DateOnly ReleaseDate { get; set; }
    public short Duration { get; set; }
    public string Description { get; set; }
    public int AgeRestrictionId { get; set; }
    public List<int> GenreIds { get; set; }

    public AddMovieCommand() { }

    public AddMovieCommand(string title, byte[] image, DateOnly releaseDate, short duration, string description,
        int ageRestrictionId, List<int> genreIds)
    {
        Title = title;
        Image = image;
        ReleaseDate = releaseDate;
        Duration = duration;
        Description = description;
        AgeRestrictionId = ageRestrictionId;
        GenreIds = genreIds;
    }
}

public class AddMovieCommandHandler : IRequestHandler<AddMovieCommand>
{
    private readonly IApplicationDbContext _dbContext;

    public AddMovieCommandHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Unit> Handle(AddMovieCommand command, CancellationToken cancellationToken)
    {
        var ageRestriction = await GetAgeRestrictionById(command.AgeRestrictionId, cancellationToken);
        var genres = await GetGenresByIds(command.GenreIds, cancellationToken);

        var movie = Movie.Create(command.Title, command.ReleaseDate, command.Duration, command.Description,
            ageRestriction, genres, command.Image);

        await _dbContext.Movies.AddAsync(movie, cancellationToken);
        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }

    private async Task<AgeRestriction> GetAgeRestrictionById(int id, CancellationToken cancellationToken)
    {
        var ageRestriction =
            await _dbContext.AgeRestrictions.FirstOrDefaultAsync(ar => (int)ar.Id == id, cancellationToken);
        if (ageRestriction is null)
        {
            throw new InvalidArgumentException($"Nie istnieje ograniczenie wiekowe o identyfikatorze: {id}");
        }

        return ageRestriction;
    }

    private async Task<List<Genre>> GetGenresByIds(ICollection<int> genreIds, CancellationToken cancellationToken)
    {
        var genres = await _dbContext.Genres.Where(g => genreIds.Contains((int)g.Id)).ToListAsync(cancellationToken);
        if (genreIds.Count == genres.Count)
        {
            return genres;
        }

        var foundGenreIds = genres.Select(g => (int)g.Id).ToList();
        var nonExistingGenreIds = genreIds.Except(foundGenreIds);
        throw new InvalidArgumentException($"Nie istnieją gatunki filmowe o identyfikatorach: {nonExistingGenreIds}");
    }
}