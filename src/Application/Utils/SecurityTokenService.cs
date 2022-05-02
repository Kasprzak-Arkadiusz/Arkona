using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Common.Interfaces;
using Domain.Enums;
using Microsoft.IdentityModel.Tokens;

namespace Application.Utils;

public class SecurityTokenService : ISecurityTokenService
{
    private readonly ApplicationSettings _applicationSettings;

    public SecurityTokenService(ApplicationSettings applicationSettings)
    {
        _applicationSettings = applicationSettings;
    }

    public string GenerateAccessTokenForUser(string userId, string email, string firstName, string lastName, Role role)
    {
        var claims = new ClaimsIdentity(new[]
        { 
            new Claim(ClaimTypes.NameIdentifier, userId),
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Name, email),
            new Claim("FirstName", firstName),
            new Claim("LastName", lastName),
            new Claim(ClaimTypes.Role, role.ToString())
        });

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_applicationSettings.AccessTokenSettings.Key));
        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiresAt = DateTime.Now.AddMinutes(_applicationSettings.AccessTokenSettings.ExpiryTimeInMinutes);
        const string issuer = "https://Arkona.com";

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = issuer,
            Subject = claims,
            Expires = expiresAt, 
            SigningCredentials = signingCredentials
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}