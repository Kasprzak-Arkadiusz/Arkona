using System.Security.Claims;
using Application.Common.Exceptions;
using Grpc.Core;
using Serilog;

namespace API.Common.Utils;

public static class CurrentUserManager
{
    public static string GetUserId(ServerCallContext context)
    {
        var user = context.GetHttpContext().User;
        var userId = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userId is not null)
        {
            return userId.Value;
        }

        Log.Warning("Missing NameIdentifier claims. Current claims: {@Claims}", user.Claims);
        throw new UnauthorizedException("Brak dostępu");

    }
}