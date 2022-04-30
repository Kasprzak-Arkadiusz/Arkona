using Domain.Entities;
using Domain.Enums;
using Domain.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class GenreConfiguration : IEntityTypeConfiguration<Genre>
{
    public void Configure(EntityTypeBuilder<Genre> builder)
    {
        builder.Property(g => g.Id)
            .HasConversion<int>();
        builder.Property(g => g.Name)
            .HasMaxLength(50)
            .IsRequired();
        builder.HasData(
            Enum.GetValues(typeof(GenreId))
                .Cast<GenreId>()
                .Select(e => Genre.Create(e, e.ToDescription())));
    }
}