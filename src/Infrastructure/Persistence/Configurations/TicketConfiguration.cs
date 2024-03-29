﻿using Domain.Entities;
using Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class TicketConfiguration : IEntityTypeConfiguration<Ticket>
{
    public void Configure(EntityTypeBuilder<Ticket> builder)
    {
        builder.Property(t => t.Number)
            .HasMaxLength(16);
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
        builder.HasOne(t => t.SeanceSeat)
            .WithOne(s => s.Ticket)
            .HasForeignKey<Ticket>(t => t.SeanceSeatId)
            .OnDelete(DeleteBehavior.ClientSetNull);
    }
}