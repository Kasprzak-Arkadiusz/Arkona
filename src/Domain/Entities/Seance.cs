namespace Domain.Entities;

public class Seance
{
    public int Id { get; private set; }
    public DateTime StartDateTime { get; private set; }
    public Movie Movie { get; private set; }
    public CinemaHall CinemaHall { get; private set; }
    public ICollection<SeanceSeat> SeanceSeats { get; private set; }

    private Seance(DateTime startDateTime, Movie movie, CinemaHall cinemaHall)
    {
        StartDateTime = startDateTime;
        Movie = movie;
        CinemaHall = cinemaHall;
        SeanceSeats = new List<SeanceSeat>();

        foreach (var seat in CinemaHall.Seats)
        {
            SeanceSeats.Add(SeanceSeat.Create(this, seat));
        }
    }

    public static Seance Create(DateTime startDateTime, Movie movie, CinemaHall cinemaHall)
    {
        return new Seance(startDateTime, movie, cinemaHall);
    }
}