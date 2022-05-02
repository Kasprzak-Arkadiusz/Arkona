﻿using System.Reflection;
using API.Validators.User;
using Calzolari.Grpc.AspNetCore.Validation;
using FluentValidation;

namespace API.Extensions;

public static class FluentValidationExtension
{
    public static IServiceCollection AddGrpcFluentValidation(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddSingleton<IValidatorErrorMessageHandler>(new RegisterRequestMessageHandler());
        services.AddGrpcValidation();

        return services;
    }
}