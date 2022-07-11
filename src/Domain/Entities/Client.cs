namespace Domain.Entities;

public class Client : User
{
    public Client(string firstName, string lastName, string email) : base(firstName, lastName, email) { }
}