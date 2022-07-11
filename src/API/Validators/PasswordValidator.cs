using System.Text.RegularExpressions;
using FluentValidation;

namespace API.Validators;

public class PasswordValidator : AbstractValidator<string>
{
    public PasswordValidator()
    {
        RuleFor(password => password)
            .MinimumLength(ValidationConstants.MinPasswordLength)
            .WithMessage($"Hasło musi zawierać minimum {ValidationConstants.MinPasswordLength} znaków");

        RuleFor(password => password)
            .Matches(@"[0-9]+")
            .WithMessage("Hasło musi zawierać minimum jedną liczbę");

        RuleFor(password => password)
            .Matches(@"[A-Z]+")
            .WithMessage("Hasło musi zawierać minimum jedną dużą literę");

        RuleFor(password => password)
            .Matches(@"[a-z]+")
            .WithMessage("Hasło musi zawierać minimum jedną małą literę");
        
        RuleFor(password => password)
            .Must(password =>
            {
                var regex = new Regex(@"^[a-zA-Z][a-zA-Z0-9]*$");
                return !regex.Match(password).Success;
            })
            .WithMessage("Hasło musi zawierać minimum jeden znak specjalny");
    }
}