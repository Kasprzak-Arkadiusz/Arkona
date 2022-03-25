using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;

public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> builder)
    {
        builder.Property(t => t.Number)
            .HasComputedColumnSql("FORMAT([Id],'d9')")
            .HasMaxLength(9);
        builder.OwnsOne(t => t.TicketDiscount,
            navigationBuilder =>
            {
                navigationBuilder.Property(td => td.Name)
                    .HasColumnName("DiscountName")
                    .HasMaxLength(50)
                    .IsRequired();
                navigationBuilder.Property(td => td.Description)
                    .HasColumnName("DiscountDescription")
                    .HasMaxLength(200)
                    .IsRequired();
                navigationBuilder.Property(td => td.DiscountValue)
                    .HasColumnName("DiscountValue")
                    .HasPrecision(3,2)
                    .IsRequired();
            });
        builder.OwnsOne(t => t.Price,
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
        builder.HasOne(t => t.Seat)
            .WithOne(s => s.Ticket)
            .HasForeignKey<Seat>(s => s.TicketId)
            .OnDelete(DeleteBehavior.ClientSetNull);
    }
}