using Domain.Enums;
using Domain.ValueObjects;

namespace Domain.Entities;

public class AgeOffer : Offer
{
    public AgeRestriction AgeRestriction { get; private set; }
    public AgeRestrictionId AgeRestrictionId { get; private set; }
    public ICollection<Order>? Orders { get; set; }

    private AgeOffer() { }
    
    public AgeOffer(string name, string description, decimal discountValue, AgeRestriction ageRestriction) 
        : base(name, description, discountValue)
    {
        AgeRestriction = ageRestriction;
    }
}