using System.Reflection;
using API.Validators;
using Calzolari.Grpc.AspNetCore.Validation;
using FluentValidation;

namespace API.Extensions;

public static class FluentValidationExtension
{
    public static IServiceCollection AddGrpcFluentValidation(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddSingleton<IValidatorErrorMessageHandler>(new CustomErrorMessageHandler());
        services.AddGrpcValidation();

        return services;
    }
}