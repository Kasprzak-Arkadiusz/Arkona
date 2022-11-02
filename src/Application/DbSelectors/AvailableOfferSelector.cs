using Domain.Entities;
using Domain.Enums;

namespace Application.DbSelectors;

public class AvailableOfferResult
{
    public int Id { get; init; }
    public string Name { get; init; }
    public string Description { get; init; }
    public DateOnly ValidFrom { get; init; }
    public DateOnly ValidTo { get; init; }
    public int MinTickets { get; init; }
    public GenreId GenreId { get; init; }
}

public static class AvailableOfferSelector
{
    public static IQueryable<AvailableOfferResult> GetAvailableOfferResult(this IQueryable<AgeOffer> source,
        DateOnly date)
    {
        return source.Select(o => new AvailableOfferResult
        {
            Id = o.Id,
            Name = o.Name,
            Description = o.Description,
            ValidFrom = o.ValidPeriod.ValidFrom,
            ValidTo = o.ValidPeriod.ValidTo
        }).Where(r => r.ValidFrom <= date && r.ValidTo >= date);
    }

    public static IQueryable<AvailableOfferResult> GetAvailableOfferResult(this IQueryable<AmountOffer> source,
        DateOnly date)
    {
        return source.Select(o => new AvailableOfferResult
        {
            Id = o.Id,
            Name = o.Name,
            Description = o.Description,
            ValidFrom = o.ValidPeriod.ValidFrom,
            ValidTo = o.ValidPeriod.ValidTo,
            MinTickets = o.RequiredNumberOfTickets
        }).Where(r => r.ValidFrom <= date && r.ValidTo >= date);
    }

    public static IQueryable<AvailableOfferResult> GetAvailableOfferResult(this IQueryable<MovieGenreOffer> source,
        DateOnly date, IEnumerable<GenreId> genreIds)
    {
        return source.Select(o => new AvailableOfferResult
        {
            Id = o.Id,
            Name = o.Name,
            Description = o.Description,
            ValidFrom = o.ValidPeriod.ValidFrom,
            ValidTo = o.ValidPeriod.ValidTo,
            GenreId = o.GenreId
        }).Where(o => o.ValidFrom <= date && o.ValidTo >= date && genreIds.Contains(o.GenreId));
    }
}