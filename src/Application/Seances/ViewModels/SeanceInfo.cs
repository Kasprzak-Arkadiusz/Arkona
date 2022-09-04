namespace Application.Seances.ViewModels;

public class SeanceInfo
{
    public int Id { get; set; }
    public string Time { get; set; }
    public string DayOfWeek { get; set; }

    public SeanceInfo(int id, string time, string dayOfWeek)
    {
        Id = id;
        Time = time;
        DayOfWeek = dayOfWeek;
    }
}