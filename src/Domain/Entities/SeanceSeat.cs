namespace Domain.Entities;

public class SeanceSeat
{
    public Seance? Seance { get; set; }
    public int SeanceId { get; set; }
    public Seat? Seat { get; set; }
    public int SeatId { get; set; }
}