namespace Domain.Entities;

public class CinemaHall
{
    private const char FirstRowChar = 'A';

    public byte Id { get; private set; }
    public byte HallNumber { get; private set; }
    public short NumberOfSeats { get; private set; }
    public IEnumerable<Seance>? Seances { get; }
    public ICollection<Seat> Seats { get; }

    private CinemaHall() { }

    private CinemaHall(byte hallNumber, short numberOfSeats, short numberOfSeatsInRow)
    {
        HallNumber = hallNumber;
        NumberOfSeats = numberOfSeats;
        Seats = new List<Seat>();
        Seances = new List<Seance>();

        var rowChar = FirstRowChar;
        var numberOfRows = numberOfSeats / numberOfSeatsInRow;

        for (var i = 0; i < numberOfRows; i++)
        {
            var firstNumberOfSeatInRow = i * numberOfSeatsInRow;
            for (var j = 1; j <= numberOfSeatsInRow; j++)
                Seats.Add(Seat.Create((short)(firstNumberOfSeatInRow + j), rowChar));

            rowChar = (char)(Convert.ToUInt16(rowChar) + 1);
        }

        var numberOfSeatsInLastRow = numberOfSeats % numberOfRows;
        if (numberOfSeatsInLastRow == 0)
            return;

        var firstSeatNumberInLastRow = numberOfSeats - numberOfSeatsInLastRow + 1;
        for (var i = 0; i < numberOfSeatsInLastRow; i++)
            Seats.Add(Seat.Create((short)(firstSeatNumberInLastRow + i), rowChar));
    }

    public static CinemaHall Create(byte hallNumber, short numberOfSeats, short numberOfSeatsInRow)
    {
        // Here would go business logic validation

        var movie = Movie.Create("", new DateOnly(), 0, "");
        movie.Update();

        return new CinemaHall(hallNumber, numberOfSeats, numberOfSeatsInRow);
    }
}