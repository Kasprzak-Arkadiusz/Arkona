using Application.Common.Interfaces;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.Orders.ViewModels;
using Domain.ValueObjects;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Orders.Queries;

public class GetUserOrdersQuery : IRequest<IList<OrderDetailsVm>>
{
    public string UserId { get; }

    public GetUserOrdersQuery(string userId)
    {
        UserId = userId;
    }
}

public class GetUserOrdersQueryHandler : IRequestHandler<GetUserOrdersQuery, IList<OrderDetailsVm>>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IIdentityService _identityService;

    public GetUserOrdersQueryHandler(IApplicationDbContext dbContext, IIdentityService identityService)
    {
        _dbContext = dbContext;
        _identityService = identityService;
    }

    public async Task<IList<OrderDetailsVm>> Handle(GetUserOrdersQuery query, CancellationToken cancellationToken)
    {
        if (!await _identityService.UserWithIdExistsAsync(query.UserId))
        {
            throw new Exception($"Nie istnieje użytkownik o identyfikatorze {query.UserId}");
        }

        // TODO (in the distant future) Add relation between Seance and Order to simplify below queries
        var userTickets = await _dbContext.Tickets
            .Include(t => t.Order)
            .Include(t => t.TicketDiscount)
            .Include(t => t.SeanceSeat)
            .ThenInclude(ss => ss.Seat)
            .Where(t => t.Order.UserId == query.UserId)
            .ToListAsync(cancellationToken);

        var firstTicketsOnDifferentOrders = userTickets.GroupBy(t => t.Order.Id).Select(t => t.First());

        var seanceDetails = _dbContext.Seances
            .Include(s => s.CinemaHall)
            .Include(s => s.Movie)
            .Include(s => s.SeanceSeats)
            .Select(s => new
            {
                SeanceId = s.Id,
                DateOfSeance = s.StartDateTime,
                CinemaHallNumber = s.CinemaHall.HallNumber,
                MovieTitle = s.Movie.Title,
                SeanceSeatIds = s.SeanceSeats.Select(ss => ss.Id)
            }).ToList()
            .Where(s => s.SeanceSeatIds.Any(seanceSeatId =>
                firstTicketsOnDifferentOrders.Any(t => t.SeanceSeat.Id == seanceSeatId)));

        var orderAndSeanceMatched = firstTicketsOnDifferentOrders.Select(t => new
        {
            Order = t.Order,
            Seance = seanceDetails.First(s => s.SeanceId == t.SeanceSeat.SeanceId)
        });

        var orderDetails = orderAndSeanceMatched.Select(os => new OrderDetailsVm
        {
            OrderNumber = os.Order.Number,
            DateOfPurchase = os.Order.DateTimeOfOrder,
            MovieTitle = os.Seance.MovieTitle,
            DateOfSeance = os.Seance.DateOfSeance,
            TotalPrice = userTickets.Where(ut => ut.Order.Id == os.Order.Id).Sum(t => t.Price.DiscountedPrice),
            HallNumber = os.Seance.CinemaHallNumber,
            Tickets = (userTickets.Where(ut => ut.Order.Id == os.Order.Id)).Select(ut => new TicketDetailsVm
            {
                SeatNumber = ut.SeanceSeat.Seat.Number,
                Price = Price.PriceToString(ut.Price.DiscountedPrice),
                DiscountName = ut.TicketDiscount!.Name
            }).ToList()
        }).OrderByDescending(o => o.DateOfPurchase).ToList();

        return orderDetails;
    }
}