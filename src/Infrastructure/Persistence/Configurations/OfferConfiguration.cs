using Domain.Entities;
using Infrastructure.Persistence.Comparers;
using Infrastructure.Persistence.Converters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class OfferConfiguration : IEntityTypeConfiguration<Offer>
{
    public void Configure(EntityTypeBuilder<Offer> builder)
    {
        builder.Property(m => m.Name)
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(m => m.Description)
            .HasMaxLength(1000)
            .IsRequired();
        builder.Property(m => m.DiscountValue)
            .HasPrecision(3, 2)
            .IsRequired();
        builder.Property(o => o.ValidFrom)
            .HasColumnType("date")
            .HasConversion<DateOnlyConverter, DateOnlyComparer>()
            .IsRequired();
        builder.Property(o => o.ValidTo)
            .HasColumnType("date")
            .HasConversion<DateOnlyConverter, DateOnlyComparer>()
            .IsRequired();
    }
}