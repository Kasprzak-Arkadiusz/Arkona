using FluentValidation;

namespace API.Validators.Movies;

public class AddMovieValidator : AbstractValidator<AddMovieRequest>
{
    public AddMovieValidator()
    {
        RuleFor(req => req.Title).MaximumLength(100);
    }
}