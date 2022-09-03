using Domain.Entities;
using Infrastructure.Persistence.Comparers;
using Infrastructure.Persistence.Converters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class MovieConfiguration : IEntityTypeConfiguration<Movie>
{
    public void Configure(EntityTypeBuilder<Movie> builder)
    {
        builder.Property(m => m.Title)
            .HasMaxLength(100)
            .IsRequired();
        builder.Property(m => m.ReleaseDate)
            .HasColumnType("date")
            .HasConversion<DateOnlyConverter, DateOnlyComparer>()
            .IsRequired();
        builder.Property(m => m.Duration)
            .IsRequired();
        builder.Property(m => m.Description)
            .HasMaxLength(1000)
            .IsRequired();
        builder.HasOne(m => m.AgeRestriction)
            .WithMany(ac => ac.Movies);
        builder.HasMany(m => m.Seances)
            .WithOne(s => s.Movie);
    }
}