using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.Common.Models;
using Application.ViewModels;
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
    private readonly IApplicationDbContext _dbContext;

    public LoginUserCommandHandler(IAuthenticationService authenticationService,
        ISecurityTokenService securityTokenService, IApplicationDbContext dbContext)
    {
        _authenticationService = authenticationService;
        _securityTokenService = securityTokenService;
        _dbContext = dbContext;
    }

    public async Task<AuthViewModel> Handle(LoginUserCommand command, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _authenticationService.LoginUserAsync(command.Email, command.Password);

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
        catch (NotFoundException e)
        {
            Log.Information(
                "Invalid login attempt. Provided: e-mail: {Email}, password: {Password}. Exception message: {Message}",
                command.Email, command.Password, e.Message);
            throw new UnauthorizedException("Nieprawidłowe dane logowania");
        }
    }
}