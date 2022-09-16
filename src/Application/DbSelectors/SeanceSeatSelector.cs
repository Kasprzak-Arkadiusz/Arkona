using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.DbSelectors;

public class SeanceSeatResult
{
    public int Id { get; set; }
    public char Row { get; set; }
    public short Number { get; set; }
    public int SeanceId { get; set; }
    public bool IsFree { get; set; }
}

public static class SeanceSeatSelector
{
    public static IQueryable<SeanceSeatResult> GetSeanceSeatsBySeanceId(this IQueryable<SeanceSeat> source, int seanceId)
    {
        return source.Include(s => s.Seat)
            .Select(s => new SeanceSeatResult
            {
                Id = s.Id,
                Number = s.Seat.Number,
                Row = s.Seat.Row,
                SeanceId = s.SeanceId,
                IsFree = s.Ticket == null
            })
            .Where(ss => ss.SeanceId == seanceId);
    }
}