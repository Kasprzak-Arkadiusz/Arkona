using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;

public class CinemaHallConfiguration : IEntityTypeConfiguration<CinemaHall>
{
    public void Configure(EntityTypeBuilder<CinemaHall> builder)
    {
        builder.Property(c => c.Id)
            .ValueGeneratedOnAdd();
        builder.Property(c => c.HallNumber)
            .IsRequired();
        builder.Property(c => c.NumberOfSeats)
            .IsRequired()
            .HasDefaultValue(256);
        builder.HasMany(c => c.Seats)
            .WithOne(s => s.CinemaHall);
        builder.HasMany(c => c.Seances)
            .WithOne(s => s.CinemaHall);
    }
}