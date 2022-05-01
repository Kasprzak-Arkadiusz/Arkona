using Domain.Enums;

namespace Application.Common.Models;

public class RegisterParams
{
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string Email { get; private set; }
    public string Password { get; private set; }
    public Role Role { get; private set; }

    public RegisterParams(string firstName, string lastName, string email, string password, Role role)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Password = password;
        Role = role;
    }
}