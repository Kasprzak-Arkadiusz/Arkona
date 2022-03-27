﻿using System.Reflection;
using Application.Common.Interfaces.IApplicationDBContext;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext() { }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<AgeConstraint> AgeConstraints { get; set; }
    public DbSet<AgeOffer> AgeOffers { get; set; }
    public DbSet<AmountOffer> AmountOffers { get; set; }
    public DbSet<CinemaHall> CinemaHalls { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<MovieGenreOffer> MovieGenreOffers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Seance> Seances { get; set; }
    public DbSet<Seat> Seats { get; set; }
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<UsedTicket> UsedTickets  { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = Environment.GetEnvironmentVariable("ArkonaConnectionString");
        optionsBuilder.UseSqlServer(connectionString, sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure();
        });
        base.OnConfiguring(optionsBuilder);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await base.SaveChangesAsync();
    }
}