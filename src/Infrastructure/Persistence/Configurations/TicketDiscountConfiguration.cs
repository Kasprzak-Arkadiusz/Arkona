using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class TicketDiscountConfiguration : IEntityTypeConfiguration<TicketDiscount>
{
    public void Configure(EntityTypeBuilder<TicketDiscount> builder)
    {
        builder.Property(td => td.Id)
            .ValueGeneratedNever();
        builder.Property(td => td.Name)
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(td => td.Description)
            .HasMaxLength(200)
            .IsRequired();
        builder.Property(td => td.DiscountValue)
            .HasPrecision(3,2)
            .IsRequired();
        builder.HasMany(td => td.Tickets)
            .WithOne(t => t.TicketDiscount);
    }
}