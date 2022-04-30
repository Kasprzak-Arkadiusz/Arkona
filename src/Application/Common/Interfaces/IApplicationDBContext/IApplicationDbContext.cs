using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces.IApplicationDBContext;

public interface IApplicationDbContext
{
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
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<TicketDiscount> TicketDiscounts { get; set; }
    public DbSet<UsedTicket> UsedTickets  { get; set; }
    Task<int> SaveChangesAsync();
}