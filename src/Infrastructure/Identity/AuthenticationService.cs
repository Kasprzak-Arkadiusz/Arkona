using Application.Common.Exceptions;
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
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IMapper _mapper;

    public AuthenticationService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,
        SignInManager<AppUser> signInManager, IMapper mapper)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _signInManager = signInManager;
        _mapper = mapper;
    }

    private async Task<AppUser> GetUserWithIdAsync(string id)
    {
        var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (appUser == default)
        {
            throw new NotFoundException("Nie istnieje użytkownik z podanym id");
        }

        return appUser;
    }

    private async Task<AppUser> GetUserWithEmailAsync(string email)
    {
        var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedEmail == email.Normalize());
        if (appUser == default)
        {
            throw new NotFoundException("Nie istnieje użytkownik z podanym e-mailem");
        }

        return appUser;
    }

    public async Task<bool> CheckIfUserWithEmailExists(string email)
    {
        return await _userManager.Users.AnyAsync(u => u.NormalizedEmail == email.Normalize());
    }

    public async Task<User> GetUserByIdAsync(string id)
    {
        var appUser = await GetUserWithIdAsync(id);
        var user = _mapper.Map<User>(appUser);

        return user;
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        var appUser = await GetUserWithEmailAsync(email);
        var user = _mapper.Map<User>(appUser);

        return user;
    }

    public async Task<string> GenerateEmailConfirmationTokenAsync(string id)
    {
        var appUser = await GetUserWithIdAsync(id);

        return await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
    }

    public async Task<bool> ConfirmUserEmail(string id, string token)
    {
        var appUser = await GetUserWithIdAsync(id);
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

        var appUser = await GetUserWithIdAsync(id);

        if (!await _userManager.IsInRoleAsync(appUser, stringRole))
        {
            await _userManager.AddToRoleAsync(appUser, stringRole);
        }

        return true;
    }

    public async Task<bool> IsEmailConfirmedAsync(string id)
    {
        var appUser = await GetUserWithIdAsync(id);

        return await _userManager.IsEmailConfirmedAsync(appUser);
    }

    public async Task SignInUserAsync(string id, string password)
    {
        var appUser = await GetUserWithIdAsync(id);

        await _signInManager.PasswordSignInAsync(appUser, password, false, true);
    }

    public async Task<bool> IsUserLockoutAsync(string id)
    {
        var appUser = await GetUserWithIdAsync(id);

        return await _userManager.IsLockedOutAsync(appUser);
    }
}