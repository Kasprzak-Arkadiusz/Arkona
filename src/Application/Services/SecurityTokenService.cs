using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Application.Common.Interfaces;
using Domain.Enums;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services;

public class SecurityTokenService : ISecurityTokenService
{
    private readonly ApplicationSettings _applicationSettings;

    public SecurityTokenService(ApplicationSettings applicationSettings)
    {
        _applicationSettings = applicationSettings;
    }

    public string GenerateIdToken(string userId, string email, string firstName, string lastName, Role role)
    {
        var claims = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Email, email),
            new Claim("FirstName", firstName),
            new Claim("LastName", lastName),
            new Claim(ClaimTypes.Role, role.ToString())
        });

        return GenerateJsonWebToken(claims);
    }

    public string GenerateAccessToken(string userId, Role role)
    {
        var claims = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Role, role.ToString())
        });

        return GenerateJsonWebToken(claims);
    }

    private string GenerateJsonWebToken(ClaimsIdentity claims)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.AccessTokenSettings.Key));
        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiresAt = DateTime.Now.AddMinutes(_applicationSettings.AccessTokenSettings.ExpiryTimeInMinutes);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = _applicationSettings.AccessTokenSettings.JwtIssuer,
            Subject = claims,
            Expires = expiresAt,
            SigningCredentials = signingCredentials
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
        return refreshToken;
    }

    public string ValidateAccessToken(string accessToken)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        tokenHandler.ValidateToken(accessToken,
            TokenValidationParametersCreator.Create(_applicationSettings, TimeSpan.FromMinutes(5)),
            out var validatedToken);

        var jwtToken = (JwtSecurityToken)validatedToken;
        var userId = jwtToken.Claims.First(x => x.Type == "nameid").Value;

        return userId;
    }
}