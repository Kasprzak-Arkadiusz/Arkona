namespace Domain.Entities;

public class Seance
{
    public int Id { get; private set; }
    public DateTime StartDateTime { get; private set; }
    public Movie Movie { get; set; }
    public CinemaHall CinemaHall { get; set; }
    public ICollection<Ticket> Tickets { get; set; }
    public ICollection<SeanceSeat> SeanceSeats { get; set; }

    private Seance() { }
    public Seance(DateTime startDateTime)
    {
        StartDateTime = startDateTime;
    }
}