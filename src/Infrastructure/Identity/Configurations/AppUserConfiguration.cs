using Application.Common.Models;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Identity.Configurations;

public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
{
    public void Configure(EntityTypeBuilder<AppUser> builder)
    {
        builder.Property(u => u.FirstName)
            .HasMaxLength(40)
            .IsRequired();
        builder.Property(u => u.LastName)
            .HasMaxLength(40)
            .IsRequired();

        builder
            .Ignore(u => u.PhoneNumber)
            .Ignore(u => u.PhoneNumberConfirmed)
            .Ignore(u => u.TwoFactorEnabled);

        builder.HasMany<Order>()
            .WithOne()
            .HasForeignKey(o => o.UserId);

        builder.HasMany<UsedTicket>()
            .WithOne()
            .HasForeignKey(ut => ut.UserId);

        builder.HasOne(u => u.RefreshToken)
            .WithOne()
            .HasForeignKey<RefreshToken>(rf => rf.UserId);

        builder.ToTable("Users");
    }
}