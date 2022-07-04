using Application.Contracts;

namespace Application.Common.Interfaces;

public interface IFacebookAuthService
{
    Task<FacebookTokenValidationResult> ValidateAccessTokenAsync(string accessToken);
    Task<FacebookUserInfoResult> GetUserInfoAsync(string accessToken);
}