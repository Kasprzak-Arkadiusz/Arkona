using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;

public class AgeConstraintConfiguration : IEntityTypeConfiguration<AgeConstraint>
{
    public void Configure(EntityTypeBuilder<AgeConstraint> builder)
    {
        builder.Property(ac => ac.Id)
            .ValueGeneratedOnAdd();
        builder.ToTable("AgeConstraints");
    }
}