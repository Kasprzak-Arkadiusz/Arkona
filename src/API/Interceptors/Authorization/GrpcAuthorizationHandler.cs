using Microsoft.AspNetCore.Authorization;
using Serilog;

namespace API.Interceptors.Authorization;

public class GrpcRequirement : IAuthorizationRequirement { }

public class GrpcAuthorizationHandler : AuthorizationHandler<GrpcRequirement>
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GrpcAuthorizationHandler(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, GrpcRequirement requirement)
    {
        var userClaims = context.User;
        Log.Information("{@UserClaims}",userClaims.ToString());
        var test = _httpContextAccessor.HttpContext?.User;
        
        if (userClaims.Identity is not null && userClaims.Identity.IsAuthenticated)
        {
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

        context.Fail(new AuthorizationFailureReason(this, "Brak dostępu"));
        return Task.CompletedTask;
    }
}