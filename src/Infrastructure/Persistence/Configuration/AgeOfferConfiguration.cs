using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configuration;

public class AgeOfferConfiguration : IEntityTypeConfiguration<AgeOffer>
{
    public void Configure(EntityTypeBuilder<AgeOffer> builder)
    {
        builder.Property(a => a.Name)
            .HasMaxLength(50)
            .IsRequired();
        builder.Property(a => a.Description)
            .HasMaxLength(1000)
            .IsRequired();
        builder.Property(a => a.DiscountValue)
            .HasPrecision(3, 2)
            .IsRequired();
        builder.HasOne(ao => ao.AgeConstraint)
            .WithOne(ac => ac.AgeOffer)
            .HasForeignKey<AgeOffer>(ao => ao.AgeConstraintId);
        builder.HasMany(a => a.Orders)
            .WithOne(o => o.AgeOffer);
    }
}