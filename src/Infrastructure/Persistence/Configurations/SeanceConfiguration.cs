using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class SeanceConfiguration : IEntityTypeConfiguration<Seance>
{
    public void Configure(EntityTypeBuilder<Seance> builder)
    {
        builder.Property(s => s.StartDateTime)
            .HasColumnType("smalldatetime")
            .IsRequired();
        builder.HasMany(s => s.Tickets)
            .WithOne(t => t.Seance);
    }
}