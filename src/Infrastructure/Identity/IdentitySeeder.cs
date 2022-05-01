using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Enums;
using Infrastructure.Persistence;

namespace Infrastructure.Identity;

public static class IdentitySeeder
{
    public static async Task SeedAsync(ApplicationDbContext context, IAuthenticationService authenticationService)
    {
        if (context.Users.Any())
        {
            return;
        }

        var registerParameters = new List<RegisterParams>
        {
            new("Jan", "Kowalski", "JanKowalski156372@gmail.com", "sYd&jDc@VU5ZVFn!", Role.Client),
            new("Małgorzata", "Nowak", "MalgorzataNowakArkona@gmail.com", "7&HjLDhW!ikDhQHJ", Role.Worker)
        };

        foreach (var registerParameter in registerParameters)
        {
            await SeedUser(authenticationService, registerParameter);
        }
    }

    private static async Task SeedUser(IAuthenticationService authenticationService, RegisterParams parameters)
    {
        var userId = await authenticationService.RegisterUserAsync(parameters);
        var emailConfirmationToken = await authenticationService.GenerateEmailConfirmationTokenAsync(userId);
        await authenticationService.ConfirmUserEmail(userId, emailConfirmationToken);
        await authenticationService.AddToRoleAsync(userId, parameters.Role);
    }
}