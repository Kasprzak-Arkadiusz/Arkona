using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.ViewModels;
using Domain.Enums;
using MediatR;
using Serilog;

namespace Application.Users.Commands;

public class LoginUserCommand : IRequest<AuthViewModel>
{
    public string Email { get; }
    public string Password { get; }

    public LoginUserCommand(string email, string password)
    {
        Email = email;
        Password = password;
    }
}

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, AuthViewModel>
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ISecurityTokenService _securityTokenService;

    public LoginUserCommandHandler(IAuthenticationService authenticationService,
        ISecurityTokenService securityTokenService)
    {
        _authenticationService = authenticationService;
        _securityTokenService = securityTokenService;
    }

    public async Task<AuthViewModel> Handle(LoginUserCommand command, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _authenticationService.LoginUserAsync(command.Email, command.Password);

            var accessToken = _securityTokenService.GenerateAccessTokenForUser(user.Id, user.Email, user.FirstName,
                user.LastName, Role.Client);

            return new AuthViewModel
            {
                AccessToken = accessToken,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Id = user.Id,
                Role = Role.Client.ToString()
            };
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