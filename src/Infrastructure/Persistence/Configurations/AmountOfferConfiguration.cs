using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class AmountOfferConfiguration : IEntityTypeConfiguration<AmountOffer>
{
    public void Configure(EntityTypeBuilder<AmountOffer> builder)
    {
        builder.Property(a => a.RequiredNumberOfTickets)
            .IsRequired();
        builder.Property(a => a.DiscountedNumberOfTickets)
            .IsRequired();
    }
}