using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.Orders.ViewModels;
using Domain.Common;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Orders.Commands;

public class FinalizeOrderCommand : IRequest
{
    public List<TicketDiscountVm> SelectedTickets { get; }
    public List<int> SeatIds { get; }
    public string UserId { get; }
    public int OfferId { get; }

    public FinalizeOrderCommand(List<TicketDiscountVm> selectedTickets, List<int> seatIds, string userId, int offerId)
    {
        SelectedTickets = selectedTickets;
        SeatIds = seatIds;
        UserId = userId;
        OfferId = offerId;
    }
}

public class FinalizeOrderCommandHandler : IRequestHandler<FinalizeOrderCommand>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IIdentityService _identityService;

    public FinalizeOrderCommandHandler(IApplicationDbContext dbContext, IIdentityService identityService)
    {
        _dbContext = dbContext;
        _identityService = identityService;
    }

    public async Task<Unit> Handle(FinalizeOrderCommand command, CancellationToken cancellationToken)
    {
        var selectedSeats = await _dbContext.SeanceSeats
            .Include(s => s.Ticket)
            .Where(s => command.SeatIds.Any(id => id == s.Id))
            .ToListAsync(cancellationToken);

        if (!CheckIfSeatsAreFree(selectedSeats))
        {
            throw new InvalidArgumentException("Wybrane miejsca są już zajęte.");
        }

        if (!await _identityService.UserWithIdExistsAsync(command.UserId))
        {
            throw new Exception($"Nie istnieje użytkownik o identyfikatorze {command.UserId}");
        }

        var offer = await _dbContext.Offers.FindAsync(new object[] { (short)command.OfferId },
            cancellationToken: cancellationToken);

        var selectedTickets = await ToSelectedTicketListAsync(command.SelectedTickets, cancellationToken);
        var tickets = Ticket.CreateMany(selectedSeats, selectedTickets);
        await _dbContext.Tickets.AddRangeAsync(tickets, cancellationToken);

        var order = Order.Create(tickets, command.UserId, offer);
        await _dbContext.Orders.AddAsync(order, cancellationToken);

        await _dbContext.SaveChangesAsync();

        return Unit.Value;
    }

    private static bool CheckIfSeatsAreFree(IEnumerable<SeanceSeat> seanceSeats)
    {
        return seanceSeats.All(s => s.Ticket is null);
    }

    private async Task<List<SelectedTicket>> ToSelectedTicketListAsync(
        IReadOnlyCollection<TicketDiscountVm> ticketDiscountVms,
        CancellationToken cancellationToken)
    {
        var ticketDiscounts = await _dbContext.TicketDiscounts.ToListAsync(cancellationToken);

        return ticketDiscountVms.Select(ticketDiscountVm => new SelectedTicket
            {
                Discount = FindDiscountById(ticketDiscounts, ticketDiscountVm.DiscountId),
                Count = (byte)ticketDiscountVm.Count
            })
            .ToList();
    }

    private static TicketDiscount FindDiscountById(IReadOnlyCollection<TicketDiscount> ticketDiscounts, int discountId)
    {
        var discount = ticketDiscounts.FirstOrDefault(td => td.Id == discountId);
        return discount ?? ticketDiscounts.First(td => td.DiscountValue == 1);
    }
}