namespace Domain.Entities;

public class AgeConstraint
{
    public byte Id { get; set; }
    public byte MinAge { get; private set; }

    public ICollection<Movie> Movies { get; set; }
    public AgeOffer AgeOffer { get; set; }
}