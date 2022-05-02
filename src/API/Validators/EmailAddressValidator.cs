using FluentValidation;

namespace API.Validators;

public class EmailAddressValidator : AbstractValidator<string>
{
    public EmailAddressValidator()
    {
        RuleFor(emailAddress => emailAddress)
            .MinimumLength(ValidationConstants.MinEmailAddressLength)
            .WithMessage($"E-mail musi zawierać minimum {ValidationConstants.MinEmailAddressLength} znaki");

        RuleFor(emailAddress => emailAddress)
            .MaximumLength(ValidationConstants.MaxEmailAddressLength)
            .WithMessage($"E-mail musi zawierać maksymalnie {ValidationConstants.MaxEmailAddressLength} znaków");

        RuleFor(emailAddress => emailAddress)
            .EmailAddress()
            .WithMessage("E-mail ma niewłaściwy format");
    }
}