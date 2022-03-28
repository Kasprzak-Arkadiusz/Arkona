using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;

public class MovieGenreOfferConfiguration : IEntityTypeConfiguration<MovieGenreOffer>
{
    public void Configure(EntityTypeBuilder<MovieGenreOffer> builder)
    {
        builder.HasOne(mgo => mgo.Genre)
            .WithOne(g => g.MovieGenreOffer)
            .HasForeignKey<MovieGenreOffer>(mgo => mgo.GenreId);
        builder.HasMany(mgo => mgo.Orders)
            .WithOne(o => o.MovieGenreOffer)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.ClientSetNull);
    }
}