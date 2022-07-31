using FluentValidation;

namespace API.Validators.Offers;

public class GetLatestOffersValidator : AbstractValidator<GetLatestOffersRequest>
{
    public GetLatestOffersValidator()
    {
        RuleFor(req => req.Count)
            .GreaterThan(0)
            .LessThan(short.MaxValue);
    }
}