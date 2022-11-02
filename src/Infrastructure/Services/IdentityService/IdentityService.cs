using Application.Common.Interfaces;
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
}