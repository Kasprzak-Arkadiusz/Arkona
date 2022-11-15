using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services;

public static class TokenValidationParametersCreator
{
    public static TokenValidationParameters Create(ApplicationSettings applicationSettings, TimeSpan? clockSkew = null)
    {
        var stringKey = applicationSettings.AccessTokenSettings.Key;
        var key = Encoding.ASCII.GetBytes(stringKey);
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = clockSkew ?? TimeSpan.Zero
        };

        return tokenValidationParameters;
    }
}