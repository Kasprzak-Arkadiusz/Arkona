using Application.TicketDiscounts.Queries;
using Grpc.Core;
using MediatR;

namespace API.Services;

public class TicketDiscountService : TicketDiscount.TicketDiscountBase
{
    private readonly IMediator _mediator;

    public TicketDiscountService(IMediator mediator)
    {
        _mediator = mediator;
    }

    public override async Task<GetTicketDiscountsResponse> GetTicketDiscounts(EmptyRequest request,
        ServerCallContext context)
    {
        var viewModel = await _mediator.Send(new GetTicketDiscountsQuery());
        
        var response = new GetTicketDiscountsResponse();
        response.TicketDiscount.AddRange(viewModel.Select(td => new TicketDiscountsDetails
        {
            Id = td.Id,
            Name = td.Name,
            Description = td.Description,
            DiscountValue = td.DiscountValue == 1 ? string.Empty : $"-{(1 - td.DiscountValue) * 100:F0}%"
        }));

        return response;
    }
}

