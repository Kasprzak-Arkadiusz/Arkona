namespace Domain.Entities;

public class Seat
{
    public int Id { get; private set; }
    public short Number { get; private set; }
    public char Row { get; private set; }
    public CinemaHall CinemaHall { get; set; }
    public IEnumerable<SeanceSeat> SeanceSeats { get; }

    private Seat(short number, char row)
    {
        Number = number;
        Row = row;
    }

    public static Seat Create(short number, char row)
    {
        return new Seat(number, row);
    }
}