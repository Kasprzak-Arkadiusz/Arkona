using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Enums;
using MediatR;

namespace Application.Users.Commands.RegisterUser;

public class RegisterUserCommand : IRequest<string>
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

public class RegisterUseCommandHandler : IRequestHandler<RegisterUserCommand, string>
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ISecurityTokenService _securityTokenService;

    public RegisterUseCommandHandler(IAuthenticationService authenticationService,
        ISecurityTokenService securityTokenService)
    {
        _authenticationService = authenticationService;
        _securityTokenService = securityTokenService;
    }

    public async Task<string> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        var userExists = await _authenticationService.CheckIfUserWithEmailExists(command.Email);

        if (userExists)
        {
            throw new AlreadyExistsException("Użytkownik z podanym e-mailem już istnieje.");
        }

        var userId = await _authenticationService.RegisterUserAsync(
            new RegisterParams(command.FirstName, command.LastName, command.Email, command.Password, Role.Client));

        var accessToken = _securityTokenService.GenerateAccessTokenForUser(userId, command.Email, command.FirstName,
            command.LastName, Role.Client);

        return accessToken;
    }
}