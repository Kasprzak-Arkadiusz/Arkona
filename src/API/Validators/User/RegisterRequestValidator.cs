using FluentValidation;

namespace API.Validators.User;

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(req => req.FirstName).NotEmpty().WithMessage("Imię jest wymagane")
            .MaximumLength(ValidationConstants.MaxFirstNameLength)
            .WithMessage($"Imię musi zawierać maksymalnie {ValidationConstants.MaxFirstNameLength} znaków");
        RuleFor(req => req.LastName).NotEmpty().WithMessage("Nazwisko jest wymagane")
            .MaximumLength(ValidationConstants.MaxLastNameLength)
            .WithMessage($"Nazwisko musi zawierać maksymalnie {ValidationConstants.MaxLastNameLength} znaków");;
        RuleFor(req => req.Email).SetValidator(new EmailAddressValidator());
        RuleFor(req => req.Password).SetValidator(new PasswordValidator());
    }
}