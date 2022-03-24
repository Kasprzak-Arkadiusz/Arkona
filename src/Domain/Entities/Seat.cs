namespace Domain.Entities;

public class Seat
{
    public int Id { get; private set; }
    public byte Number { get; private set; }
    public string Row { get; private set; }

    public Seat(byte number, string row)
    {
        Number = number;
        Row = row;
    }
}