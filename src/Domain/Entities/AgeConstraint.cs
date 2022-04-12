namespace Domain.Entities;

public class AgeConstraint
{
    public byte Id { get; private set; }
    public byte MinAge { get; private set; }

    public ICollection<Movie>? Movies { get; private set; }
    public AgeOffer? AgeOffer { get; private set; }

    private AgeConstraint() { }
}