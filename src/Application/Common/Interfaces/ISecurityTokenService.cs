using Domain.Enums;

namespace Application.Common.Interfaces;

public interface ISecurityTokenService
{
    string GenerateIdToken(string userId, string email, string firstName, string lastName, Role role);
    string GenerateAccessToken(string userId, Role role);
    string GenerateRefreshToken();
    string ValidateAccessToken(string accessToken);
}