using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class AgeOfferConfiguration : IEntityTypeConfiguration<AgeOffer>
{
    public void Configure(EntityTypeBuilder<AgeOffer> builder)
    {
        builder.Property(ao => ao.AgeRestrictionId)
            .HasConversion<int>();
        builder.HasOne(ao => ao.AgeRestriction)
            .WithOne(ac => ac.AgeOffer)
            .HasForeignKey<AgeOffer>(ao => ao.AgeRestrictionId);
    }
}