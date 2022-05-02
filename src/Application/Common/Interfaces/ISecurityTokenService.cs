using Domain.Enums;

namespace Application.Common.Interfaces;

public interface ISecurityTokenService
{
    string GenerateAccessTokenForUser(string userId, string email, string firstName, string lastName, Role role);
}