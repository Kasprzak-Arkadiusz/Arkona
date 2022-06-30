using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.ViewModels;
using Domain.Enums;
using MediatR;

namespace Application.Users.Commands;

public class RegisterUserCommand : IRequest<AuthViewModel>
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

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, AuthViewModel>
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ISecurityTokenService _securityTokenService;
    private readonly IEmailService _emailService;

    public RegisterUserCommandHandler(IAuthenticationService authenticationService,
        ISecurityTokenService securityTokenService, IEmailService emailService)
    {
        _authenticationService = authenticationService;
        _securityTokenService = securityTokenService;
        _emailService = emailService;
    }

    public async Task<AuthViewModel> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        var userExists = await _authenticationService.CheckIfUserWithEmailExists(command.Email);

        if (userExists)
        {
            throw new AlreadyExistsException("Użytkownik z podanym e-mailem już istnieje.");
        }

        var userId = await _authenticationService.RegisterUserAsync(
            new RegisterParams(command.FirstName, command.LastName, command.Email, command.Password, Role.Client));

        var user = await _authenticationService.GetUserByIdAsync(userId);
        var token = await _authenticationService.GenerateEmailConfirmationTokenAsync(userId);
        await _authenticationService.ConfirmUserEmail(userId, token);

        var accessToken = _securityTokenService
            .GenerateAccessTokenForUser(user.Id, user.Email, user.FirstName, user.LastName, Role.Client);

        return new AuthViewModel
        {
            AccessToken = accessToken,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Id = userId,
            Role = Role.Client.ToString()
        };
    }
}