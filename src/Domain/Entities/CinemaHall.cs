namespace Domain.Entities;

public class CinemaHall
{
    public byte Id { get; private set; }
    public byte HallNumber { get; private set; }
    public short NumberOfSeats { get; private set; }
    public ICollection<Seance>? Seances { get; set; }
    public ICollection<Seat>? Seats { get; set; }

    private CinemaHall() { }
    
    public CinemaHall(byte hallNumber, short numberOfSeats)
    {
        HallNumber = hallNumber;
        NumberOfSeats = numberOfSeats;
    }
}