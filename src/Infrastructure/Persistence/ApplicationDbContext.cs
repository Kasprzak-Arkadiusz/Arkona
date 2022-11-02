using System.Reflection;
using Application.Common.Interfaces.IApplicationDBContext;
using Domain.Entities;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class ApplicationDbContext : IdentityDbContext<AppUser>, IApplicationDbContext
{
    public ApplicationDbContext() { }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<AgeRestriction> AgeRestrictions { get; set; }
    public DbSet<AgeOffer> AgeOffers { get; set; }
    public DbSet<AmountOffer> AmountOffers { get; set; }
    public DbSet<CinemaHall> CinemaHalls { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<MovieGenreOffer> MovieGenreOffers { get; set; }
    public DbSet<Offer> Offers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Seance> Seances { get; set; }
    public DbSet<Seat> Seats { get; set; }
    public DbSet<SeanceSeat> SeanceSeats { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<TicketDiscount> TicketDiscounts { get; set; }
    public DbSet<UsedTicket> UsedTickets { get; set; }
    public DbSet<AppUser> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await base.SaveChangesAsync();
    }
}