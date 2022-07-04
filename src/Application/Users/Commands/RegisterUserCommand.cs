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

    public RegisterUserCommandHandler(IAuthenticationService authenticationService,
        ISecurityTokenService securityTokenService)
    {
        _authenticationService = authenticationService;
        _securityTokenService = securityTokenService;
    }

    public async Task<AuthViewModel> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        var user = await _authenticationService.RegisterUserAsync(
            new RegisterParams(command.FirstName, command.LastName, command.Email, Role.Client, command.Password));

        var accessToken = _securityTokenService
            .GenerateAccessTokenForUser(user.Id, user.Email, user.FirstName, user.LastName, Role.Client);

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
}