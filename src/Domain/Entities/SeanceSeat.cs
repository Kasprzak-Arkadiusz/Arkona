namespace Domain.Entities;

public class SeanceSeat
{
    public int Id { get; private set; }
    public Seance Seance { get; private set; }
    public int SeanceId { get; private set; }
    public Seat Seat { get; private set; }
    public int SeatId { get; private set; }
    public Ticket? Ticket { get; private set; }

    private SeanceSeat(Seance seance, Seat seat, Ticket? ticket = null)
    {
        Seance = seance;
        Seat = seat;
        Ticket = ticket;
    }

    public static SeanceSeat Create(Seance seance, Seat seat, Ticket? ticket = null)
    {
        return new SeanceSeat(seance, seat, ticket);
    }
}