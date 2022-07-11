using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Enums;
using MediatR;
using Serilog;

namespace Application.Users.Commands;

public class LoginUserCommand : IRequest<string>
{
    public string Email { get; }
    public string Password { get; }

    public LoginUserCommand(string email, string password)
    {
        Email = email;
        Password = password;
    }
}

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, string>
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ISecurityTokenService _securityTokenService;

    public LoginUserCommandHandler(IAuthenticationService authenticationService,
        ISecurityTokenService securityTokenService)
    {
        _authenticationService = authenticationService;
        _securityTokenService = securityTokenService;
    }

    public async Task<string> Handle(LoginUserCommand command, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _authenticationService.LoginUserAsync(command.Email, command.Password);

            var accessToken = _securityTokenService.GenerateAccessTokenForUser(user.Id, user.Email, user.FirstName,
                user.LastName, Role.Client);

            return accessToken;
        }
        catch (NotFoundException e)
        {
            Log.Information(
                "Invalid login attempt. Provided: e-mail: {Email}, password: {Password}. Exception message: {Message}",
                command.Email, command.Password, e.Message);
            throw new UnauthorizedException("Nieprawidłowe dane logowania");
        }
    }
}