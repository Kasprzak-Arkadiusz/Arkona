using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class MovieGenreOfferConfiguration : IEntityTypeConfiguration<MovieGenreOffer>
{
    public void Configure(EntityTypeBuilder<MovieGenreOffer> builder)
    {
        builder.Property(mgo => mgo.GenreId)
            .HasConversion<int>();
        builder.HasOne(mgo => mgo.Genre)
            .WithOne(g => g.MovieGenreOffer)
            .HasForeignKey<MovieGenreOffer>(mgo => mgo.GenreId);
    }
}