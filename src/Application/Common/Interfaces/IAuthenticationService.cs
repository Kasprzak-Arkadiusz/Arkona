using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;

namespace Application.Common.Interfaces;

public interface IAuthenticationService
{
    Task<User?> GetUserByIdAsync(string id);
    Task<User?> GetUserByEmailAsync(string email);
    Task<string> GenerateEmailConfirmationTokenAsync(string id);
    Task<bool> ConfirmUserEmail(string id, string token);
    Task<string> RegisterUserAsync(RegisterParams parameters);
    Task<bool> AddToRoleAsync(string id, Role role);
}