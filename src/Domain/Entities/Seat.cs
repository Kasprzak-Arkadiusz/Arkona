namespace Domain.Entities;

public class Seat
{
    public int Id { get; private set; }
    public byte Number { get; private set; }
    public char Row { get; private set; }
    public CinemaHall CinemaHall { get; set; }
    public int TicketId { get; set; }
    public Ticket Ticket { get; set; }

    private Seat() { }
    public Seat(byte number, char row)
    {
        Number = number;
        Row = row;
    }
}