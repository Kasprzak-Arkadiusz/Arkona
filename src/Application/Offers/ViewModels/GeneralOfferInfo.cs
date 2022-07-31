namespace Application.Offers.ViewModels;

public class GeneralOfferInfo
{
    public short Id { get; set; }
    public string Name { get; set; }
    public byte[]? Image { get; set; }

    public GeneralOfferInfo(short id, string name, byte[]? image)
    {
        Id = id;
        Name = name;
        Image = image;
    }
}