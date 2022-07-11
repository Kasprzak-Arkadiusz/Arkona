using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Contracts;
using Newtonsoft.Json;

namespace Infrastructure.Services.GoogleAuthService;

public class GoogleAuthService : IGoogleAuthService
{
    private const string ExchangeCodeUrl =
        "https://oauth2.googleapis.com/token?code={0}&client_id={1}&client_secret={2}&redirect_uri={3}&grant_type=authorization_code";

    private const string UserInfoUrl =
        "https://www.googleapis.com/oauth2/v1/userinfo?access_token={0}";

    private readonly GoogleAuthSettings _googleAuthSettings;
    private readonly IHttpClientFactory _httpClientFactory;

    public GoogleAuthService(InfrastructureSettings infrastructureSettings, IHttpClientFactory httpClientFactory)
    {
        _googleAuthSettings = infrastructureSettings.GoogleAuthSettings;
        _httpClientFactory = httpClientFactory;
    }

    public async Task<ExchangeCodeResult> ExchangeCodeAsync(string code)
    {
        var formattedUrl = string.Format(ExchangeCodeUrl, code, _googleAuthSettings.ClientId,
            _googleAuthSettings.ClientSecret, _googleAuthSettings.RedirectUri);

        var result = await _httpClientFactory.CreateClient().PostAsync(formattedUrl, null);
        
        if (!result.IsSuccessStatusCode)
        {
            throw new ExternalServiceException("Wystąpił problem podczas połączenia z serwerem Google");
        }
        
        var responseAsString = await result.Content.ReadAsStringAsync();
        return await Task.Factory.StartNew(() =>
            JsonConvert.DeserializeObject<ExchangeCodeResult>(responseAsString));
    }

    public async Task<GoogleUserInfoResult> GetUserInfoAsync(string accessToken)
    {
        var formattedUrl = string.Format(UserInfoUrl, accessToken);
        
        var result = await _httpClientFactory.CreateClient().GetAsync(formattedUrl);

        if (!result.IsSuccessStatusCode)
        {
            throw new ExternalServiceException("Wystąpił problem podczas połączenia z serwerem Google");
        }

        var responseAsString = await result.Content.ReadAsStringAsync();
        return await Task.Factory.StartNew(() =>
            JsonConvert.DeserializeObject<GoogleUserInfoResult>(responseAsString));
    }
}