using Domain.ValueObjects;

namespace Domain.Entities;

public class AgeOffer : Offer
{
    public AgeConstraint AgeConstraint { get; private set; }
    
    public AgeOffer(string name, string description, decimal discountValue, AgeConstraint ageConstraint) 
        : base(name, description, discountValue)
    {
        AgeConstraint = ageConstraint;
    }
}