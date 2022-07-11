using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Contracts;
using Newtonsoft.Json;

namespace Infrastructure.Services.FacebookAuthService;

public class FacebookAuthService : IFacebookAuthService
{
    private const string TokenValidationUrl =
        "https://graph.facebook.com/debug_token?input_token={0}&access_token={1}|{2}";

    private const string UserInfoUrl =
        "https://graph.facebook.com/me?fields=first_name,last_name,email&access_token={0}";

    private readonly FacebookAuthSettings _facebookAuthSettings;
    private readonly IHttpClientFactory _httpClientFactory;

    public FacebookAuthService(InfrastructureSettings infrastructureSettings, IHttpClientFactory httpClientFactory)
    {
        _facebookAuthSettings = infrastructureSettings.FacebookAuthSettings;
        _httpClientFactory = httpClientFactory;
    }

    private async Task<T> SendRequestAsync<T>(string formattedUrl) where T : class
    {
        var result = await _httpClientFactory.CreateClient().GetAsync(formattedUrl);

        if (!result.IsSuccessStatusCode)
        {
            throw new ExternalServiceException("Wystąpił problem podczas połączenia z serwerem Facebooka");
        }

        var responseAsString = await result.Content.ReadAsStringAsync();
        return await Task.Factory.StartNew(() =>
            JsonConvert.DeserializeObject<T>(responseAsString));
    }
    
    public async Task<FacebookTokenValidationResult> ValidateAccessTokenAsync(string accessToken)
    {
        var formattedUrl = string.Format(TokenValidationUrl, accessToken, _facebookAuthSettings.AppId,
            _facebookAuthSettings.AppSecret);
        return await SendRequestAsync<FacebookTokenValidationResult>(formattedUrl);
    }

    public async Task<FacebookUserInfoResult> GetUserInfoAsync(string accessToken)
    {
        var formattedUrl = string.Format(UserInfoUrl, accessToken);
        return await SendRequestAsync<FacebookUserInfoResult>(formattedUrl);
    }
}