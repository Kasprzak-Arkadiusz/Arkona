using FluentValidation;

namespace API.Validators.User;

public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
{
    public RegisterRequestValidator()
    {
        RuleFor(comm => comm.FirstName).NotEmpty().WithMessage("Imię jest wymagane");
        RuleFor(comm => comm.LastName).NotEmpty().WithMessage("Nazwisko jest wymagane");
        RuleFor(comm => comm.Email).SetValidator(new EmailAddressValidator());
        RuleFor(comm => comm.Password).SetValidator(new PasswordValidator());
    }   
}