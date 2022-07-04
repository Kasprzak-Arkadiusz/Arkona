using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;

namespace Application.Common.Interfaces;

public interface IAuthenticationService
{
    Task<bool> CheckIfUserWithEmailExists(string email);
    Task<User> GetUserByIdAsync(string id);
    Task<User> GetUserByEmailAsync(string email);
    Task<string> GenerateEmailConfirmationTokenAsync(string id);
    Task<bool> ConfirmUserEmail(string id, string token);
    Task<string> RegisterUserAsync(RegisterParams parameters);
    Task<bool> AddToRoleAsync(string id, Role role);
    Task<bool> IsEmailConfirmedAsync(string id);
    Task SignInUserAsync(string id, string password);
    Task<bool> IsUserLockoutAsync(string id);
    Task<User> LoginWithFacebookAsync(string token);
}