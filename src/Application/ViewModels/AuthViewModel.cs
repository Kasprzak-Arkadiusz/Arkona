namespace Application.ViewModels;

public class AuthViewModel
{
    public AuthViewModel(string accessToken, string refreshToken, string idToken)
    {
        AccessToken = accessToken;
        RefreshToken = refreshToken;
        IdToken = idToken;
    }

    public AuthViewModel() { }

    public string AccessToken { get; init; }
    public string RefreshToken { get; init; }
    public string IdToken { get; init; }
}