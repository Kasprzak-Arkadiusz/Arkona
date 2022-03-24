namespace Domain.ValueObjects;

public record AgeConstraint(byte MinAge)
{
    public byte MinAge { get; private set; } = MinAge;
}