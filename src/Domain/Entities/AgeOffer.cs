using Domain.ValueObjects;

namespace Domain.Entities;

public class AgeOffer : Offer
{
    public AgeConstraint AgeConstraint { get; private set; }
    public byte AgeConstraintId { get; private set; }
    public ICollection<Order>? Orders { get; set; }

    private AgeOffer() { }
    
    public AgeOffer(string name, string description, decimal discountValue, AgeConstraint ageConstraint) 
        : base(name, description, discountValue)
    {
        AgeConstraint = ageConstraint;
    }
}