using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;

public class AmountOfferConfiguration : IEntityTypeConfiguration<AmountOffer>
{
    public void Configure(EntityTypeBuilder<AmountOffer> builder)
    {
        builder.Property(a => a.Name)
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(a => a.Description)
            .HasMaxLength(1000)
            .IsRequired();
        builder.Property(a => a.DiscountValue)
            .HasPrecision(3, 2)
            .IsRequired();
        builder.Property(a => a.RequiredNumberOfTickets)
            .IsRequired();
        builder.Property(a => a.DiscountedNumberOfTickets)
            .IsRequired();
        builder.HasMany(a => a.Orders)
            .WithOne(o => o.AmountOffer);
    }
}