using Application.Common.Models;
using Domain.Entities;

namespace Application.Common.Interfaces;

public interface IAuthenticationService
{
    Task<User> RegisterUserAsync(RegisterParams parameters);
    Task<User> LoginUserAsync(string email, string password);
    Task<User> LoginWithFacebookAsync(string token);
    Task<User> LoginWithGoogleAsync(string code);
}