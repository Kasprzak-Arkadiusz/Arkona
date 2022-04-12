using Domain.ValueObjects;

namespace Domain.Entities;

public class AgeOffer : Offer
{
    public AgeConstraint AgeConstraint { get; private set; }
    public byte AgeConstraintId { get; private set; }
    public IEnumerable<Order> Orders { get; }

    private AgeOffer() { }

    private AgeOffer(string name, string description, decimal discountValue, AgeConstraint ageConstraint,
        Period validPeriod)
        : base(name, description, discountValue, validPeriod)
    {
        AgeConstraint = ageConstraint;
        Orders = new List<Order>();
    }

    public static AgeOffer Create(string name, string description, decimal discountValue, AgeConstraint ageConstraint,
        Period validPeriod)
    {
        return new AgeOffer(name, description, discountValue, ageConstraint, validPeriod);
    }
}