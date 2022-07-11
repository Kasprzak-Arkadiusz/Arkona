using Application.Contracts;

namespace Application.Common.Interfaces;

public interface IGoogleAuthService
{
    Task<ExchangeCodeResult> ExchangeCodeAsync(string code);
    Task<GoogleUserInfoResult> GetUserInfoAsync(string accessToken);
}