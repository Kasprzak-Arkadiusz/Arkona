using Application.Common.Models;

namespace Application.Common.Interfaces;

public interface IEmailService
{
    Task SendConfirmationEmailAsync(EmailAddress emailAddress, string callbackUrl);
}