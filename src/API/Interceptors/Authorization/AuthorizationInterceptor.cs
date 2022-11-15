using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using API.Common.Utils;
using Application;
using Application.Common.Interfaces;
using Application.Services;
using Grpc.Core;
using Grpc.Core.Interceptors;

namespace API.Interceptors.Authorization;

public class AuthorizationInterceptor : Interceptor
{
    private readonly IIdentityService _identityService;
    private readonly ApplicationSettings _applicationSettings;

    public AuthorizationInterceptor(IIdentityService identityService, ApplicationSettings applicationSettings)
    {
        _identityService = identityService;
        _applicationSettings = applicationSettings;
    }

    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(TRequest request,
        ServerCallContext context,
        UnaryServerMethod<TRequest, TResponse> continuation)
    {
        var token = context.RequestHeaders.Get("authorization")?.Value.Split(" ").Last();
        if (token != null)
        {
            await AttachUserToContext(context, token);
        }

        return await continuation(request, context);
    }

    private async Task AttachUserToContext(ServerCallContext context, string token)
    {
        var tokenValidationParameters = TokenValidationParametersCreator.Create(_applicationSettings);
        var tokenHandler = new JwtSecurityTokenHandler();
        tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);

        var jwtToken = (JwtSecurityToken)validatedToken;
        var userId = jwtToken.Claims.First(x => x.Type == "nameid").Value;

        var user = await _identityService.GetUserByIdAsync(userId);
        if (user is not null)
        {
            var identity = new ClaimsIdentity(new[]
            { 
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("FirstName", user.FirstName),
                new Claim("LastName", user.LastName),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            });
            
            var roles = new[] { "User" };
            context.GetHttpContext().User = new GenericPrincipal(identity, roles);
        }
    }
}