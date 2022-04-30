using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class SeanceSeatConfiguration : IEntityTypeConfiguration<SeanceSeat>
{
    public void Configure(EntityTypeBuilder<SeanceSeat> builder)
    {
        builder.HasKey(ss => new {ss.SeanceId, ss.SeatId});
        builder.HasOne(ss => ss.Seance)
            .WithMany(s => s.SeanceSeats)
            .HasForeignKey(ss => ss.SeanceId)
            .OnDelete(DeleteBehavior.ClientSetNull);
        builder.HasOne(ss => ss.Seat)
            .WithMany(s => s.SeanceSeats)
            .HasForeignKey(ss => ss.SeatId);
    }
}