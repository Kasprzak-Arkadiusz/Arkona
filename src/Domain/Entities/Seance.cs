namespace Domain.Entities;

public class Seance
{
    public int Id { get; private set; }
    public DateTime StartDateTime { get; private set; }

    public Seance(DateTime startDateTime)
    {
        StartDateTime = startDateTime;
    }
}