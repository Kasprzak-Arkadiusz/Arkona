using Domain.Enums;
using Domain.ValueObjects;

namespace Domain.Entities;

public class AgeOffer : Offer
{
    public AgeRestriction AgeRestriction { get; private set; }
    public AgeRestrictionId AgeRestrictionId { get; private set; }

    private AgeOffer() { }
    
    private AgeOffer(string name, string description, decimal discountValue, AgeRestriction ageRestriction,
        Period validPeriod)
        : base(name, description, discountValue, validPeriod)
    {
        AgeRestriction = ageRestriction;
    }

    public static AgeOffer Create(string name, string description, decimal discountValue, AgeRestriction ageRestriction,
        Period validPeriod)
    {
        return new AgeOffer(name, description, discountValue, ageRestriction, validPeriod);
    }
}