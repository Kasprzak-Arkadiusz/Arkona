using Domain.Enums;

namespace Domain.Entities;

public class AgeRestriction
{
    public AgeRestrictionId Id { get; set; }
    public string Name { get; private set; }
    public byte MinAge { get; private set; }

    public ICollection<Movie> Movies { get; set; }
    public AgeOffer AgeOffer { get; set; }

    private AgeRestriction(AgeRestrictionId id, string name, byte minAge)
    {
        Id = id;
        Name = name;
        MinAge = minAge;
        Movies = new List<Movie>();
    }

    public static AgeRestriction Create(AgeRestrictionId id, string name, byte minAge)
    {
        return new AgeRestriction(id, name, minAge);
    }
}