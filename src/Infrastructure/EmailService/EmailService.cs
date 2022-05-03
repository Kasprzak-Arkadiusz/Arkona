using System.Text.Encodings.Web;
using Application.Common.Interfaces;
using Application.Common.Models;
using MimeKit;
using MimeKit.Text;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace Infrastructure.EmailService;

public class EmailService : IEmailService
{
    private readonly InfrastructureSettings _infrastructureSettings;

    public EmailService(InfrastructureSettings infrastructureSettings)
    {
        _infrastructureSettings = infrastructureSettings;
    }

    private async Task SendEmailAsync(EmailAddress emailAddress, string subject, string htmlMessage)
    {
        var config = _infrastructureSettings.EmailConfiguration;
        var message = new MimeMessage();
        message.To.Add(new MailboxAddress(emailAddress.FullName, emailAddress.Address));
        message.From.Add(new MailboxAddress(config.SenderName, config.SenderEmail));
        message.Subject = subject;
        message.Body = new TextPart(TextFormat.Html)
        {
            Text = htmlMessage
        };

        using var emailClient = new SmtpClient();
        await emailClient.ConnectAsync(config.HostSmtp, config.Port, config.EnableSsl);

        emailClient.AuthenticationMechanisms.Remove("XOAUTH2");

        await emailClient.AuthenticateAsync(config.SenderEmail, config.SenderEmailPassword);
        await emailClient.SendAsync(message);
        await emailClient.DisconnectAsync(true);
    }

    public async Task SendConfirmationEmailAsync(EmailAddress emailAddress, string callbackUrl)
    {
        const string subject = "Confirm your email";
        var htmlMessage = $"Please confirm your account by <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>clicking here</a>.";
        await SendEmailAsync(emailAddress, subject, htmlMessage);
    }
}