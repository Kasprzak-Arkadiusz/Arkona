using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;

namespace Application.Common.Interfaces;

public interface IAuthenticationService
{
    Task<User> RegisterUserAsync(RegisterParams parameters);
    Task<User> LoginUserAsync(string email, string password);
    Task<User> LoginWithFacebookAsync(string token);
}