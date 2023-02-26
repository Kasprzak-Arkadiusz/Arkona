using FluentValidation;
using DomainMovie = Domain.Entities.Movie;

namespace API.Validators.Movies;

public class AddMovieValidator : AbstractValidator<AddMovieRequest>
{
    private const string TooLongTitleMessage = "Tytuł nie może być dłuższy niż {0} znaków.";
    private const string FieldIsRequired = "Pole {0} jest wymagane.";
    
    private static readonly DateTime MaxReleaseDate = DateTime.Today;
    private const string TooLateReleaseDateMessage = "Wybrana data musi być z przeszłości.";

    private const string DurationTooBigMessage = "Czas trwania musi być mniejszy od {0} minut.";

    private const string DescriptionTooLong = "Opis nie może być dłuższy niż {0} znaków.";
    
    public AddMovieValidator()
    {
        RuleFor(req => req.Title)
            .MaximumLength(DomainMovie.MaxTitleLength)
            .WithMessage(string.Format(TooLongTitleMessage, DomainMovie.MaxTitleLength))
            .NotEmpty()
            .WithMessage(string.Format(FieldIsRequired, "tytuł"));
        RuleFor(req => req.ReleaseDate.ToDateTime().Date)
            .LessThan(MaxReleaseDate.Date)
            .WithMessage(TooLateReleaseDateMessage)
            .NotEmpty()
            .WithMessage(string.Format(FieldIsRequired, "data premiery"));
        RuleFor(req => req.Duration)
            .LessThanOrEqualTo(DomainMovie.MaxDurationInMinutes)
            .WithMessage(string.Format(DurationTooBigMessage, DomainMovie.MaxDurationInMinutes))
            .NotEmpty()
            .WithMessage(string.Format(FieldIsRequired, "czas trwania"));
        RuleFor(req => req.Description)
            .MaximumLength(DomainMovie.MaxDescriptionLength)
            .WithMessage(string.Format(DescriptionTooLong, DomainMovie.MaxDescriptionLength))
            .NotEmpty()
            .WithMessage(string.Format(FieldIsRequired, "opis"));
        RuleFor(req => req.AgeRestrictionId)
            .NotEmpty()
            .WithMessage(string.Format(FieldIsRequired, "ograniczenie wiekowe"));
        RuleFor(req => req.GenreIds)
            .NotEmpty()
            .WithMessage(string.Format(FieldIsRequired, "gatunki"));
    }
}