using Grpc.Core;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Interceptors;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeWithJwtAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var userClaims = context.HttpContext.User;
        if (userClaims.Identity is not null && userClaims.Identity.IsAuthenticated)
        {
            return;
        }

        var status = new Status(StatusCode.Unauthenticated, "Brak dostępu");
        throw new RpcException(status);
    }
}