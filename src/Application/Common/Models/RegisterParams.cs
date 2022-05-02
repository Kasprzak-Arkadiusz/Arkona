using Domain.Enums;

namespace Application.Common.Models;

public class RegisterParams
{
    public string FirstName { get; }
    public string LastName { get; }
    public string Email { get; }
    public string Password { get; }
    public Role Role { get; }

    public RegisterParams(string firstName, string lastName, string email, string password, Role role)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Password = password;
        Role = role;
    }
}