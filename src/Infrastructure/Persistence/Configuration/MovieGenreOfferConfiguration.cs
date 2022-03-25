using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;

public class MovieGenreOfferConfiguration : IEntityTypeConfiguration<MovieGenreOffer>
{
    public void Configure(EntityTypeBuilder<MovieGenreOffer> builder)
    {
        builder.Property(m => m.Name)
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(m => m.Description)
            .HasMaxLength(1000)
            .IsRequired();
        builder.Property(m => m.DiscountValue)
            .HasPrecision(3, 2)
            .IsRequired();
        builder.HasMany(m => m.Orders)
            .WithOne(o => o.MovieGenreOffer);
        builder.HasOne(m => m.MovieGenre)
            .WithMany(g => g.MovieGenreOffers);
    }
}