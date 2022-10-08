using Application.Common.Exceptions;
using Application.Common.Interfaces.IApplicationDBContext;
using Application.Offers.ViewModels;
using MediatR;

namespace Application.Offers.Queries;

public class GetOfferByIdQuery : IRequest<GetOfferByIdVm>
{
    public short Id { get; }

    public GetOfferByIdQuery(short id)
    {
        Id = id;
    }
}

internal class GetOfferByIdQueryHandler : IRequestHandler<GetOfferByIdQuery, GetOfferByIdVm>
{
    private readonly IApplicationDbContext _dbContext;

    public GetOfferByIdQueryHandler(IApplicationDbContext dbContext)
    { 
        _dbContext = dbContext;
    }

    public async Task<GetOfferByIdVm> Handle(GetOfferByIdQuery query, CancellationToken cancellationToken)
    {
        var offer = await _dbContext.Offers.FindAsync(new object[] { query.Id }, cancellationToken: cancellationToken);
        if (offer is null)
        {
            throw new NotFoundException($"Nie istnieje oferta z identyfikatorem: {query.Id}");
        }

        var viewModel = new GetOfferByIdVm
        {
            Id = offer.Id,
            Name = offer.Name
        };
        return viewModel;
    }
}