using FluentValidation;

namespace API.Validators.User;

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(req => req.FirstName)
            .MaximumLength(ValidationConstants.MaxFirstNameLength)
            .WithMessage($"Imię musi zawierać maksymalnie {ValidationConstants.MaxFirstNameLength} znaków");
        RuleFor(req => req.LastName)
            .MaximumLength(ValidationConstants.MaxLastNameLength)
            .WithMessage($"Nazwisko musi zawierać maksymalnie {ValidationConstants.MaxLastNameLength} znaków");;
        RuleFor(req => req.Email).SetValidator(new EmailAddressValidator());
        RuleFor(req => req.Password).SetValidator(new PasswordValidator());
    }
}