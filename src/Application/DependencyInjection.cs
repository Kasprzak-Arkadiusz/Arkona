using System.Reflection;
using Application.Common.Interfaces;
using Application.Services;
using Application.Utils;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyInjection
{
    public static void AddApplication(this IServiceCollection services, ApplicationSettings settings)
    {
        services.AddSingleton(settings);
        services.AddSingleton(settings.AccessTokenSettings);

        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(Assembly.GetExecutingAssembly());

        services.AddScoped<ISecurityTokenService, SecurityTokenService>();
        
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
    }
}