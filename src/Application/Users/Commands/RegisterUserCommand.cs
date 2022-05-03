using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Enums;
using MediatR;

namespace Application.Users.Commands;

public class RegisterUserCommand : IRequest
{
    public string FirstName { get; }
    public string LastName { get; }
    public string Email { get; }
    public string Password { get; }

    public RegisterUserCommand(string firstName, string lastName, string email, string password)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
        Password = password;
    }
}

public class RegisterUseCommandHandler : IRequestHandler<RegisterUserCommand, Unit>
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IEmailService _emailService;

    public RegisterUseCommandHandler(IAuthenticationService authenticationService, IEmailService emailService)
    {
        _authenticationService = authenticationService;
        _emailService = emailService;
    }

    public async Task<Unit> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        var userExists = await _authenticationService.CheckIfUserWithEmailExists(command.Email);

        if (userExists)
        {
            throw new AlreadyExistsException("Użytkownik z podanym e-mailem już istnieje.");
        }

        var userId = await _authenticationService.RegisterUserAsync(
            new RegisterParams(command.FirstName, command.LastName, command.Email, command.Password, Role.Client));

        var user = await _authenticationService.GetUserByIdAsync(userId);

        // TODO After integration with FrontEnd change callback url
        await _emailService.SendConfirmationEmailAsync(new EmailAddress("Akasprzak016@gmail.com", user.GetFullName()),
            "test");

        return Unit.Value;
    }
}