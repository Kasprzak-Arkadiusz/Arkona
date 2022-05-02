using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IMapper _mapper;

    public AuthenticationService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,
        IMapper mapper)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _mapper = mapper;
    }

    public async Task<bool> CheckIfUserWithEmailExists(string email)
    {
        return await _userManager.Users.AnyAsync(u => u.NormalizedEmail == email.Normalize());
    }

    public async Task<User?> GetUserByIdAsync(string id)
    {
        var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        var user = _mapper.Map<User>(appUser);

        return user;
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedEmail == email.Normalize());
        var user = _mapper.Map<User>(appUser);

        return user;
    }

    public async Task<string> GenerateEmailConfirmationTokenAsync(string id)
    {
        var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (appUser != default)
        {
            return await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
        }

        return string.Empty;
    }

    public async Task<bool> ConfirmUserEmail(string id, string token)
    {
        var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (appUser == default)
        {
            return false;
        }

        var result = await _userManager.ConfirmEmailAsync(appUser, token);

        return result.Succeeded;
    }

    public async Task<string> RegisterUserAsync(RegisterParams parameters)
    {
        var appUser = _mapper.Map<AppUser>(parameters);
        appUser.UserName = parameters.Email;
        appUser.SecurityStamp = Guid.NewGuid().ToString();

        await _userManager.CreateAsync(appUser, parameters.Password);

        return appUser.Id;
    }

    public async Task<bool> AddToRoleAsync(string id, Role role)
    {
        var stringRole = role.ToString();
        if (!await _roleManager.RoleExistsAsync(stringRole))
        {
            await _roleManager.CreateAsync(new IdentityRole(stringRole));
        }

        var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);

        if (appUser == default)
        {
            return false;
        }

        if (!await _userManager.IsInRoleAsync(appUser, stringRole))
        {
            await _userManager.AddToRoleAsync(appUser, stringRole);
        }

        return true;
    }
}