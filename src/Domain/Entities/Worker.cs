namespace Domain.Entities;

public class Worker : User
{
    public Worker(string firstName, string lastName, string email) : base(firstName, lastName, email) { }
}