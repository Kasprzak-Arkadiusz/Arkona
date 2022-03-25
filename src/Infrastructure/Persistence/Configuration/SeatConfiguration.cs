using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;

public class SeatConfiguration : IEntityTypeConfiguration<Seat>
{
    public void Configure(EntityTypeBuilder<Seat> builder)
    {
        builder.Property(s => s.Number)
            .IsRequired();
        builder.Property(s => s.Row)
            .HasColumnType("char")
            .HasMaxLength(1);
    }
}