using Application.Common.Interfaces.IApplicationDBContext;
using Application.TicketDiscounts.ViewModels;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.TicketDiscounts.Queries;

public class GetTicketDiscountsQuery : IRequest<IEnumerable<TicketDiscountDetails>> { }

public class
    GetTicketDiscountsQueryHandler : IRequestHandler<GetTicketDiscountsQuery, IEnumerable<TicketDiscountDetails>>
{
    private readonly IApplicationDbContext _dbContext;

    public GetTicketDiscountsQueryHandler(IApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<TicketDiscountDetails>> Handle(GetTicketDiscountsQuery query,
        CancellationToken cancellationToken)
    {
        var ticketDiscounts = await _dbContext.TicketDiscounts.Select(td => new TicketDiscountDetails
        {
            Id = td.Id,
            Name = td.Name,
            Description = td.Description,
            DiscountValue = td.DiscountValue
        }).ToListAsync(cancellationToken);

        return ticketDiscounts;
    }
}