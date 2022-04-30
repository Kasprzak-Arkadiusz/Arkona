using Domain.Entities;
using Domain.Enums;
using Domain.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class AgeConstraintConfiguration : IEntityTypeConfiguration<AgeRestriction>
{
    public void Configure(EntityTypeBuilder<AgeRestriction> builder)
    {
        builder.Property(ar => ar.Id)
            .HasConversion<int>();
        builder.Property(ar => ar.Name)
            .HasMaxLength(50);
        builder.ToTable("AgeRestrictions");
        builder.HasData(Enum.GetValues(typeof(AgeRestrictionId))
            .Cast<AgeRestrictionId>()
            .Select(ar => AgeRestriction.Create(ar, ar.ToDescription(), (byte)ar)));
    }
}