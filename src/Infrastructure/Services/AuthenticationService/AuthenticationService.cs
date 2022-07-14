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
    private readonly IGoogleAuthService _googleAuthService;

    public AuthenticationService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager,
        SignInManager<AppUser> signInManager, IMapper mapper, IFacebookAuthService facebookAuthService,
        IGoogleAuthService googleAuthService)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _signInManager = signInManager;
        _mapper = mapper;
        _facebookAuthService = facebookAuthService;
        _googleAuthService = googleAuthService;
    }

    private async Task<bool> CheckIfUserWithEmailExists(string email)
    {
        return await _userManager.Users.AnyAsync(u => u.NormalizedEmail == email.Normalize());
    }

    public async Task<User> RegisterUserAsync(RegisterParams registerParams)
    {
        var userExists = await CheckIfUserWithEmailExists(registerParams.Email);

        if (userExists)
        {
            throw new AlreadyExistsException("Użytkownik z podanym e-mailem już istnieje.");
        }

        var appUser = _mapper.Map<AppUser>(registerParams);
        appUser.UserName = registerParams.Email;
        appUser.SecurityStamp = Guid.NewGuid().ToString();

        if (registerParams.Password is null)
        {
            await _userManager.CreateAsync(appUser);
        }
        else
        {
            await _userManager.CreateAsync(appUser, registerParams.Password);
        }

        await AddToRoleAsync(appUser.Id, registerParams.Role);

        await _userManager.AddClaimsAsync(appUser, new[]
        {
            new Claim(ClaimTypes.NameIdentifier, appUser.Id),
            new Claim(ClaimTypes.Email, appUser.Email),
            new Claim(ClaimTypes.Name, appUser.Email),
            new Claim("FirstName", appUser.FirstName),
            new Claim("LastName", appUser.LastName),
            new Claim(ClaimTypes.Role, registerParams.Role.ToString())
        });

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
        await _userManager.ConfirmEmailAsync(appUser, token);

        return _mapper.Map<User>(appUser);
    }

    public async Task<User> LoginUserAsync(string email, string password)
    {
        var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedEmail == email.Normalize());
        if (appUser == default)
        {
            throw new NotFoundException("Nie istnieje użytkownik z podanym e-mailem");
        }

        if (!await _userManager.IsEmailConfirmedAsync(appUser))
        {
            throw new UnauthorizedException("Nie potwierdzono e-maila");
        }

        if (await _userManager.IsLockedOutAsync(appUser))
        {
            throw new UnauthorizedException("Zbyt dużo niepoprawnych prób logowania. Konto jest zablokowane");
        }

        var result = await _signInManager.PasswordSignInAsync(appUser, password, false, true);

        if (!result.Succeeded || result.IsLockedOut)
        {
            throw new UnauthorizedException("Niepoprawne dane logowania");
        }

        return _mapper.Map<User>(appUser);
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

    private async Task AddToRoleAsync(string id, Role role)
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
            var mappedUser = _mapper.Map<User>(appUser);
            await AssignRoleAsync(mappedUser, appUser);
            return mappedUser;
        }

        appUser = new AppUser
        {
            Id = Guid.NewGuid().ToString(),
            Email = userInfo.Email,
            UserName = userInfo.Email,
            EmailConfirmed = true,
            LockoutEnabled = false
        };
        appUser.SetName(userInfo.FirstName, userInfo.LastName);

        var createdResult = await _userManager.CreateAsync(appUser);
        if (!createdResult.Succeeded)
        {
            throw new InternalServerException();
        }

        await _userManager.AddToRoleAsync(appUser, Role.Client.ToString());

        var user = _mapper.Map<User>(appUser);
        await AssignRoleAsync(user, appUser);
        return user;
    }

    private async Task AssignRoleAsync(User user, AppUser appUser)
    {
        var userRole = (await _userManager.IsInRoleAsync(appUser, Role.Worker.ToString()))
            ? Role.Worker
            : Role.Client;
        user.SetRole(userRole);
    }

    public async Task<User> LoginWithGoogleAsync(string code)
    {
        var exchangeResult = await _googleAuthService.ExchangeCodeAsync(code);
        var userInfo = await _googleAuthService.GetUserInfoAsync(exchangeResult.AccessToken);

        var appUser = await _userManager.FindByEmailAsync(userInfo.Email);

        if (appUser != null)
        {
            var mappedUser = _mapper.Map<User>(appUser);
            await AssignRoleAsync(mappedUser, appUser);
            return mappedUser;
        }

        appUser = new AppUser
        {
            Id = Guid.NewGuid().ToString(),
            Email = userInfo.Email,
            UserName = userInfo.Email,
            EmailConfirmed = true,
            LockoutEnabled = false
        };
        appUser.SetName(userInfo.GivenName, userInfo.FamilyName);

        var createdResult = await _userManager.CreateAsync(appUser);
        if (!createdResult.Succeeded)
        {
            throw new InternalServerException();
        }

        await _userManager.AddToRoleAsync(appUser, Role.Client.ToString());
        
        var user = _mapper.Map<User>(appUser);
        await AssignRoleAsync(user, appUser);
        return user;
    }
}