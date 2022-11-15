using Application.Common.Interfaces;
using Application.Common.Interfaces.IApplicationDBContext;
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
    private readonly IApplicationDbContext _dbContext;

    public RegisterUserCommandHandler(IAuthenticationService authenticationService,
        ISecurityTokenService securityTokenService, IApplicationDbContext dbContext)
    {
        _authenticationService = authenticationService;
        _securityTokenService = securityTokenService;
        _dbContext = dbContext;
    }

    public async Task<AuthViewModel> Handle(RegisterUserCommand command, CancellationToken cancellationToken)
    {
        var user = await _authenticationService.RegisterUserAsync(
            new RegisterParams(command.FirstName, command.LastName, command.Email, Role.Client, command.Password));

        var accessToken = _securityTokenService.GenerateAccessToken(user.Id, user.Role);
        var idToken =
            _securityTokenService.GenerateIdToken(user.Id, user.Email, user.FirstName, user.LastName, user.Role);
        var refreshTokenString = _securityTokenService.GenerateRefreshToken();
        
        var refreshToken = RefreshToken.Create(refreshTokenString, user.Id);
        _dbContext.RefreshTokens.Add(refreshToken);
        await _dbContext.SaveChangesAsync();

        return new AuthViewModel(accessToken, refreshTokenString, idToken);
    }
}