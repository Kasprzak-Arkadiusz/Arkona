using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;

public class CinemaHallConfiguration : IEntityTypeConfiguration<CinemaHall>
{
    public void Configure(EntityTypeBuilder<CinemaHall> builder)
    {
        builder.Property(c => c.HallNumber)
            .IsRequired();
        builder.Property(c => c.NumberOfSeats)
            .IsRequired()
            .HasDefaultValue(256);
        builder.HasMany(c => c.Seats)
            .WithOne(s => s.CinemaHall);
        builder.HasOne(c => c.Seance)
            .WithOne(s => s.CinemaHall)
            .HasForeignKey<Seance>(s => s.CinemaHallId);
    }
}