using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.Property(o => o.DateTimeOfOrder)
            .HasColumnType("datetime")
            .IsRequired();
        builder.Property(o => o.Number)
            .HasMaxLength(16);
        builder.HasMany(o => o.Tickets)
            .WithOne(t => t.Order)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}