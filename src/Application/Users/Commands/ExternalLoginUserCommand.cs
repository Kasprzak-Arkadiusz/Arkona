using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.Common.Models;
using Application.ViewModels;
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
    private readonly IApplicationDbContext _dbContext;

    public ExternalLoginUserCommandHandler(IAuthenticationService authenticationService,
        ISecurityTokenService securityTokenService, IApplicationDbContext dbContext)
    {
        _authenticationService = authenticationService;
        _securityTokenService = securityTokenService;
        _dbContext = dbContext;
    }

    public async Task<AuthViewModel> Handle(ExternalLoginUserCommand command, CancellationToken cancellationToken)
    {
        var user = command.Provider.ToLower() switch
        {
            "google" => await _authenticationService.LoginWithGoogleAsync(command.Token),
            "facebook" => await _authenticationService.LoginWithFacebookAsync(command.Token),
            _ => throw new InternalServerException($"Unrecognized external login provider {command.Provider}")
        };

        var accessToken = _securityTokenService.GenerateAccessToken(user.Id, user.Role);
        var idToken =
            _securityTokenService.GenerateIdToken(user.Id, user.Email, user.FirstName, user.LastName, user.Role);
        var refreshTokenString = _securityTokenService.GenerateRefreshToken();

        var userRefreshToken = _dbContext.RefreshTokens.FirstOrDefault(rf => rf.UserId == user.Id);
        if (userRefreshToken is null)
        {
            var refreshToken = RefreshToken.Create(refreshTokenString, user.Id);
            _dbContext.RefreshTokens.Add(refreshToken);
        }
        else
        {
            userRefreshToken.TokenValue = refreshTokenString;
        }
        
        await _dbContext.SaveChangesAsync();

        return new AuthViewModel(accessToken, refreshTokenString, idToken);
    }
}