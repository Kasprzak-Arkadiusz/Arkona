namespace Application.Common.Interfaces;

public interface IIdentityService
{
    Task<bool> UserWithIdExistsAsync(string userId);
}