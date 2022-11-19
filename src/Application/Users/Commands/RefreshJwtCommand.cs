using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.Common.Models;
using Application.Users.Commands.ViewModels;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands;

public class RefreshJwtCommand : IRequest<RefreshJwtViewModel>
{
    public string UserId { get; set; }
    public string RefreshToken { get; set; }

    public RefreshJwtCommand(string userId, string refreshToken)
    {
        UserId = userId;
        RefreshToken = refreshToken;
    }
}

public class RefreshJwtCommandHandler : IRequestHandler<RefreshJwtCommand, RefreshJwtViewModel>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly ISecurityTokenService _securityTokenService;
    private readonly IIdentityService _identityService;

    public RefreshJwtCommandHandler(IApplicationDbContext dbContext, ISecurityTokenService securityTokenService,
        IIdentityService identityService)
    {
        _dbContext = dbContext;
        _securityTokenService = securityTokenService;
        _identityService = identityService;
    }

    public async Task<RefreshJwtViewModel> Handle(RefreshJwtCommand command, CancellationToken cancellationToken)
    {
        var storedRefreshToken = await _dbContext.RefreshTokens.FirstOrDefaultAsync(rf => rf.UserId == command.UserId,
            cancellationToken: cancellationToken);
        var userRole = await _identityService.GetUserRoleAsync(command.UserId);
        if (storedRefreshToken is null || storedRefreshToken.TokenValue != command.RefreshToken)
        {
            throw new InvalidArgumentException("Nieprawidłowa wartość refresh tokenu");
        }

        storedRefreshToken.TokenValue = _securityTokenService.GenerateRefreshToken();
        await _dbContext.SaveChangesAsync();
        return new RefreshJwtViewModel
        {
            AccessToken = _securityTokenService.GenerateAccessToken(command.UserId, userRole),
            RefreshToken = storedRefreshToken.TokenValue
        };
    }
}