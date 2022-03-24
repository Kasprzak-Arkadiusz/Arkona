namespace Domain.ValueObjects;

public record MovieGenre(string Name)
{
    public string Name { get; private set; } = Name;
}