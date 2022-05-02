﻿using System.Text;
using Calzolari.Grpc.AspNetCore.Validation;
using FluentValidation.Results;

namespace API.Validators.User;

public class RegisterRequestMessageHandler : IValidatorErrorMessageHandler 
{
    public Task<string> HandleAsync(IList<ValidationFailure> failures)
    {
        var stringBuilder = new StringBuilder();
        foreach (var failure in failures)
        {
            stringBuilder.Append($"{failure.PropertyName}: {failure.ErrorMessage}\n");
        }
        
        return Task.FromResult(stringBuilder.ToString());
    }
}