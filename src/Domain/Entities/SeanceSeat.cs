namespace Domain.Entities;

public class SeanceSeat
{
    public int Id { get; set; }
    public Seance? Seance { get; set; }
    public int SeanceId { get; set; }
    public Seat? Seat { get; set; }
    public int SeatId { get; set; }
    public Ticket Ticket { get; set; }
}