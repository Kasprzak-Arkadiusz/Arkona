using System.Security.Claims;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services.AuthenticationService;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IMapper _mapper;
    private readonly IFacebookAuthService _facebookAuthService;

    public AuthenticationService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,
        SignInManager<AppUser> signInManager, IMapper mapper, IFacebookAuthService facebookAuthService)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _signInManager = signInManager;
        _mapper = mapper;
        _facebookAuthService = facebookAuthService;
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
        await AddToRoleAsync(appUser.Id, parameters.Role);

        await _userManager.AddClaimsAsync(appUser, new[]
        {
            new Claim(ClaimTypes.NameIdentifier, appUser.Id),
            new Claim(ClaimTypes.Email, appUser.Email),
            new Claim(ClaimTypes.Name, appUser.Email),
            new Claim("FirstName", appUser.FirstName),
            new Claim("LastName", appUser.LastName),
            new Claim(ClaimTypes.Role, parameters.Role.ToString())
        });

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

    public async Task<User> LoginWithFacebookAsync(string token)
    {
        var validatedTokenResult = await _facebookAuthService.ValidateAccessTokenAsync(token);

        if (!validatedTokenResult.Data.IsValid)
        {
            throw new InternalServerException();
        }

        var userInfo = await _facebookAuthService.GetUserInfoAsync(token);

        var appUser = await _userManager.FindByEmailAsync(userInfo.Email);

        if (appUser != null)
        {
            return _mapper.Map<User>(appUser);
        }

        var user = new AppUser
        {
            Id = Guid.NewGuid().ToString(),
            Email = userInfo.Email,
            UserName = userInfo.Email
        };
        user.SetName(userInfo.FirstName, userInfo.LastName);
            
        var createdResult = await _userManager.CreateAsync(user);
        if (!createdResult.Succeeded)
        {
            throw new InternalServerException();
        }

        return _mapper.Map<User>(user);

    }
}