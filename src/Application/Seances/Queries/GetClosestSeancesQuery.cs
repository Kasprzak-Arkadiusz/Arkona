using Application.Common.Interfaces.IApplicationDBContext;
using Application.Seances.ViewModels;
using Application.Services;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Seances.Queries;

public class GetClosestSeancesQuery : IRequest<IDictionary<string, List<SeanceInfo>>>
{
    public int MovieId { get; }

    public GetClosestSeancesQuery(int movieId)
    {
        MovieId = movieId;
    }
}

public class
    GetClosestSeancesQueryHandler : IRequestHandler<GetClosestSeancesQuery, IDictionary<string, List<SeanceInfo>>>
{
    private const int DaysAhead = 6;
    private readonly IApplicationDbContext _dbContext;
    private readonly ApplicationSettings _applicationSettings;

    public GetClosestSeancesQueryHandler(IApplicationDbContext dbContext, ApplicationSettings applicationSettings)
    {
        _dbContext = dbContext;
        _applicationSettings = applicationSettings;
    }

    public async Task<IDictionary<string, List<SeanceInfo>>> Handle(GetClosestSeancesQuery query,
        CancellationToken cancellationToken)
    {
        var todayDate = DateTime.Today.Date;
        var maxDate = DateTime.Today.AddDays(DaysAhead).Date;

        var culture = new System.Globalization.CultureInfo(_applicationSettings.Culture);

        var seances = await _dbContext.Seances
            .Where(s => s.Movie.Id == query.MovieId
                        && s.StartDateTime.Date >= todayDate
                        && s.StartDateTime <= maxDate)
            .Select(s =>
                new SeanceInfo(s.Id, s.StartDateTime.ToString("HH:mm"),
                    culture.DateTimeFormat.GetDayName(s.StartDateTime.DayOfWeek)))
            .ToListAsync(cancellationToken);
        
        var seanceDict = seances.GroupBy(s => s.DayOfWeek)
            .ToDictionary(s => s.Key, s => s.ToList());

        return seanceDict;
    }
}