using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.ViewModels;
using Domain.Enums;
using MediatR;

namespace Application.Users.Commands;

public class ExternalLoginUserCommand : IRequest<AuthViewModel>
{
    public string Token { get; }
    public string Provider { get; }

    public ExternalLoginUserCommand(string token, string provider)
    {
        Token = token;
        Provider = provider;
    }
}

public class ExternalLoginUserCommandHandler : IRequestHandler<ExternalLoginUserCommand, AuthViewModel>
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ISecurityTokenService _securityTokenService;

    public ExternalLoginUserCommandHandler(IAuthenticationService authenticationService,
        ISecurityTokenService securityTokenService)
    {
        _authenticationService = authenticationService;
        _securityTokenService = securityTokenService;
    }

    public async Task<AuthViewModel> Handle(ExternalLoginUserCommand command, CancellationToken cancellationToken)
    {
        var user = command.Provider.ToLower() switch
        {
            "google" => await _authenticationService.LoginWithGoogleAsync(command.Token),
            "facebook" => await _authenticationService.LoginWithFacebookAsync(command.Token),
            _ => throw new InternalServerException($"Unrecognized external login provider {command.Provider}")
        };
        
        var accessToken = _securityTokenService
            .GenerateAccessTokenForUser(user.Id, user.Email, user.FirstName, user.LastName, user.Role);

        return new AuthViewModel
        {
            AccessToken = accessToken,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Id = user.Id,
            Role = user.Role.ToString()
        };
    }
}