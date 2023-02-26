using Application.Contracts;

namespace Application.Common.Interfaces;

public interface IGoogleAuthService
{
    Task<GoogleUserInfoResult> GetUserInfoAsync(string accessToken);
}