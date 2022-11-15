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

    public RefreshJwtCommandHandler(IApplicationDbContext dbContext, ISecurityTokenService securityTokenService)
    {
        _dbContext = dbContext;
        _securityTokenService = securityTokenService;
    }

    public async Task<RefreshJwtViewModel> Handle(RefreshJwtCommand command, CancellationToken cancellationToken)
    {
        var storedRefreshToken = await _dbContext.RefreshTokens.FirstOrDefaultAsync(rf => rf.UserId == command.UserId,
            cancellationToken: cancellationToken);
        if (storedRefreshToken is null || storedRefreshToken.TokenValue != command.RefreshToken)
        {
            throw new InvalidArgumentException("Nieprawidłowa wartość refresh tokenu");
        }

        storedRefreshToken.TokenValue = _securityTokenService.GenerateRefreshToken();
        await _dbContext.SaveChangesAsync();
        return new RefreshJwtViewModel
        {
            AccessToken = _securityTokenService.GenerateAccessToken(command.UserId, Role.Client),
            RefreshToken = storedRefreshToken.TokenValue
        };
    }
}