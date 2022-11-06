using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services.IdentityService;

public class IdentityService : IIdentityService
{
    private readonly UserManager<AppUser> _userManager;

    public IdentityService(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<bool> UserWithIdExistsAsync(string userId)
    {
        return await _userManager.Users.AnyAsync(u => u.Id == userId);
    }

    public async Task<User?> GetUserByIdAsync(string userId)
    {
        var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == userId);
        if (appUser is null)
        {
            return null;
        }

        var user = User.Create(appUser.FirstName, appUser.LastName, appUser.Email);
        user.SetRole(Role.Client);
        user.SetId(appUser.Id);
        return user;
    }
}