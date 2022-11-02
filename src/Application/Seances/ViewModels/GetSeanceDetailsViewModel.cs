namespace Application.Seances.ViewModels;

public class GetSeanceDetailsViewModel
{
    public string MovieTitle { get; init; }
    public string SeanceDate { get; init; }
    public string SeanceTime { get; init; }
    public byte HallNumber { get; init; }
}