namespace Application.Offers.ViewModels;

public class AvailableOfferInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int MinTickets { get; set; }


    public AvailableOfferInfo(int id, string name, string description, int minTickets)
    {
        Id = id;
        Name = name;
        Description = description;
        MinTickets = minTickets;
    }
}