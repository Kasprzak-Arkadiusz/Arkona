namespace Domain.Entities;

public class AgeOffer : Offer
{
    public AgeConstraint AgeConstraint { get; private set; }
    public byte AgeConstraintId { get; private set; }
    public IEnumerable<Order> Orders { get; }

    private AgeOffer(string name, string description, decimal discountValue, AgeConstraint ageConstraint,
        DateOnly validFrom, DateOnly validTo)
        : base(name, description, discountValue, validFrom, validTo)
    {
        AgeConstraint = ageConstraint;
        Orders = new List<Order>();
    }

    public static AgeOffer Create(string name, string description, decimal discountValue, AgeConstraint ageConstraint,
        DateOnly validFrom, DateOnly validTo)
    {
        return new AgeOffer(name, description, discountValue, ageConstraint, validFrom, validTo);
    }
}