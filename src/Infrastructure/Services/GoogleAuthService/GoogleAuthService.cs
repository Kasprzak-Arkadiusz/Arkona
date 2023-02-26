using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Contracts;
using Newtonsoft.Json;

namespace Infrastructure.Services.GoogleAuthService;

public class GoogleAuthService : IGoogleAuthService
{
    private const string UserInfoUrl =
        "https://www.googleapis.com/oauth2/v1/userinfo?access_token={0}";

    private readonly IHttpClientFactory _httpClientFactory;

    public GoogleAuthService(InfrastructureSettings infrastructureSettings, IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
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