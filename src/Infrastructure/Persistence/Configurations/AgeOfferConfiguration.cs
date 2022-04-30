using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class AgeOfferConfiguration : IEntityTypeConfiguration<AgeOffer>
{
    public void Configure(EntityTypeBuilder<AgeOffer> builder)
    {
        builder.HasOne(ao => ao.AgeConstraint)
            .WithOne(ac => ac.AgeOffer)
            .HasForeignKey<AgeOffer>(ao => ao.AgeConstraintId);
        builder.HasMany(ao => ao.Orders)
            .WithOne(o => o.AgeOffer)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.ClientSetNull);
    }
}