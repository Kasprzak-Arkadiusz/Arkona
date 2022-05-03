using FluentValidation;

namespace API.Validators.User;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(req => req.Email).SetValidator(new EmailAddressValidator());
        RuleFor(req => req.Password).NotEmpty().WithMessage("Hasło jest wymagane");
    }
}