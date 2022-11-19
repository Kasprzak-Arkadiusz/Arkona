using Domain.Entities;
using Domain.Enums;

namespace Application.Common.Interfaces;

public interface IIdentityService
{
    Task<bool> UserWithIdExistsAsync(string userId);
    Task<User?> GetUserByIdAsync(string userId);
    Task<Role> GetUserRoleAsync(string userId);
}