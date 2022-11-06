using Domain.Entities;

namespace Application.Common.Interfaces;

public interface IIdentityService
{
    Task<bool> UserWithIdExistsAsync(string userId);
    Task<User?> GetUserByIdAsync(string userId);
}