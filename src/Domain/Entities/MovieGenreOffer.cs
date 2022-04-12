﻿using Domain.ValueObjects;

namespace Domain.Entities;

public class MovieGenreOffer : Offer
{
    public byte GenreId { get; private set; }
    public Genre Genre { get; private set; }
    public ICollection<Order> Orders { get; private set; }

    private MovieGenreOffer() { }

    private MovieGenreOffer(string name, string description, decimal discountValue, Genre genre, Period validPeriod) :
        base(name, description, discountValue, validPeriod)
    {
        Genre = genre;
        Orders = new List<Order>();
    }

    public static MovieGenreOffer Create(string name, string description, decimal discountValue, Genre genre,
        Period validPeriod)
    {
        return new MovieGenreOffer(name, description, discountValue, genre, validPeriod);
    }
}