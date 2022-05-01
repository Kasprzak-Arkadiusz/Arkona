using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Enums;
using Infrastructure.Persistence;

namespace Infrastructure.Identity;

public static class IdentitySeeder
{
    public static async Task<IEnumerable<string>> SeedAsync(ApplicationDbContext context,
        IAuthenticationService authenticationService)
    {
        if (context.Users.Any())
        {
            return Enumerable.Empty<string>();
        }

        var registerParameters = new List<RegisterParams>
        {
            new("Jan", "Kowalski", "JanKowalski156372@gmail.com", "sYd&jDc@VU5ZVFn!", Role.Client),
            new("Małgorzata", "Nowak", "MalgorzataNowakArkona@gmail.com", "7&HjLDhW!ikDhQHJ", Role.Worker)
        };

        var userIds = new List<string>();
        foreach (var registerParameter in registerParameters)
        {
            userIds.Add(await SeedUser(authenticationService, registerParameter));
        }

        return userIds;
    }

    private static async Task<string> SeedUser(IAuthenticationService authenticationService, RegisterParams parameters)
    {
        var userId = await authenticationService.RegisterUserAsync(parameters);
        var emailConfirmationToken = await authenticationService.GenerateEmailConfirmationTokenAsync(userId);
        await authenticationService.ConfirmUserEmail(userId, emailConfirmationToken);
        await authenticationService.AddToRoleAsync(userId, parameters.Role);

        return userId;
    }
}