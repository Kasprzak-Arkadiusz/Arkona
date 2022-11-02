using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.DbSelectors;

public class SeanceDetailsResult
{
    public int Id { get; init; }
    public string MovieTitle { get; init; }
    public string SeanceDate { get; init; }
    public string SeanceTime { get; init; }
    public byte HallNumber { get; init; }
}

public static class SeanceDetailsSelector
{
    public static IQueryable<SeanceDetailsResult> GetSeanceDetails(this IQueryable<Seance> source)
    {
        return source.Include(s => s.Movie)
            .Include(s => s.CinemaHall)
            .Select(s => new SeanceDetailsResult
            {
                Id = s.Id,
                MovieTitle = s.Movie.Title,
                SeanceDate = s.StartDateTime.ToString("dd/MM/yyyy"),
                SeanceTime = s.StartDateTime.ToString("t"),
                HallNumber = s.CinemaHall.HallNumber
            });
    }
}