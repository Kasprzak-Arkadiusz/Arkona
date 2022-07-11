namespace Domain.Entities;

public class User
{
    public string Id { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; private set; }

    protected User(string firstName, string lastName, string email)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
    }

    public static User Create(string firstName, string lastName, string email)
    {
        return new User(firstName, lastName, email);
    }

    public string GetFullName()
    {
        return $"{FirstName} {LastName}";
    }
}