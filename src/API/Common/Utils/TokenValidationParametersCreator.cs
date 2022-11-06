using System.Text;
using Application;
using Microsoft.IdentityModel.Tokens;

namespace API.Common.Utils;

public static class TokenValidationParametersCreator
{
    public static TokenValidationParameters Create(ApplicationSettings applicationSettings)
    {
        var stringKey = applicationSettings.AccessTokenSettings.Key;
        var key = Encoding.ASCII.GetBytes(stringKey);
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };

        return tokenValidationParameters;
    }
}