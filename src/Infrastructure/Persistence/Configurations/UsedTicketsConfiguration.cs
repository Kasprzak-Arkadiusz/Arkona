using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class UsedTicketsConfiguration : IEntityTypeConfiguration<UsedTicket>
{
    public void Configure(EntityTypeBuilder<UsedTicket> builder)
    {
        builder.Property(ut => ut.Number)
            .HasComputedColumnSql("FORMAT([Id],'d9')")
            .HasMaxLength(9);
        builder.Property(ut => ut.MovieTitle)
            .HasMaxLength(100)
            .IsRequired();
        builder.Property(ut => ut.SeanceDateTime)
            .HasColumnType("smalldatetime")
            .IsRequired();
        builder.Property(ut => ut.DiscountName)
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(ut => ut.OfferName)
            .HasMaxLength(50)
            .IsRequired();
        builder.OwnsOne(ut => ut.Price,
            navigationBuilder =>
            {
                navigationBuilder.Property(p => p.BasePrice)
                    .HasColumnName("BasePrice")
                    .HasPrecision(4, 2)
                    .IsRequired();
                navigationBuilder.Property(p => p.DiscountedPrice)
                    .HasColumnName("DiscountedPrice")
                    .HasPrecision(4, 2);
            });
    }
}