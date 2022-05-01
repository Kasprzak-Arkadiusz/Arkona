using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class DependencyInjection
{
    public static void AddApplication(this IServiceCollection services, ApplicationSettings settings)
    {
        services.AddSingleton(settings);
        services.AddSingleton(settings.AccessTokenSettings);
    }
}