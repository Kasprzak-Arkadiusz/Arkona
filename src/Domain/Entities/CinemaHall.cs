namespace Domain.Entities;

public class CinemaHall
{
    public byte Id { get; private set; }
    public byte HallNumber { get; private set; }
    public ushort NumberOfSeats { get; private set; }

    public CinemaHall(byte hallNumber, ushort numberOfSeats)
    {
        HallNumber = hallNumber;
        NumberOfSeats = numberOfSeats;
    }
}