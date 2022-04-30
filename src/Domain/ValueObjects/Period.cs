using Domain.Exceptions;

namespace Domain.ValueObjects;

public record Period
{
    public DateOnly ValidFrom { get; private set; }
    public DateOnly ValidTo { get; private set; }

    private Period(DateOnly validFrom, DateOnly validTo)
    {
        ValidFrom = validFrom;
        ValidTo = validTo;
    }

    public static Period Create(DateOnly validFrom, DateOnly validTo, DateOnly now)
    {
        if (validTo <= validFrom)
            throw new InvalidDateException(
                $"Parameter '{nameof(validTo)}' cannot be earlier than parameter '{validTo}'.");

        if (validTo <= now)
            throw new InvalidDateException($"Parameter '{nameof(validTo)}' cannot be earlier than now");

        return new Period(validFrom, validTo);
    }

    public void ExtendPeriod(DateOnly validTo)
    {
        if (validTo <= ValidTo)
            throw new InvalidDateException("The date provided should be later than the current value.");

        ValidTo = validTo;
    }

    public void ShortenPeriod(DateOnly validTo)
    {
        if (validTo < ValidFrom)
            throw new InvalidDateException("The given date cannot be earlier than the starting date of the offer.");
    }
}