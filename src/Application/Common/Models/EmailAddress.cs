namespace Application.Common.Models;

public class EmailAddress
{
    public string Address { get; }
    public string FullName { get; }

    public EmailAddress(string address, string fullName)
    {
        Address = address;
        FullName = fullName;
    }
}