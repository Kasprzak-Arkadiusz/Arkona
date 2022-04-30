using Application.Common.Interfaces.IApplicationDBContext;
using Domain.Entities;
using Domain.Enums;
using Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Utils;

public static class DatabaseSeeder
{
    private static IApplicationDbContext _context;

    public static async Task SeedAsync(IApplicationDbContext context)
    {
        _context = context;
        if (_context.TicketDiscounts.Any())
        {
            return;
        }

        var cinemaHalls = await SeedCinemaHalls();
        var ticketDiscounts = await SeedTicketDiscounts();
        var genres = await _context.Genres.ToDictionaryAsync(g => g.Id);
        var ageRestrictions = await _context.AgeRestrictions.ToDictionaryAsync(ar => ar.Id);
        var movies = await SeedMovies(genres, ageRestrictions);
        var seances = await SeedSeances(movies, cinemaHalls);
        var offers = await SeedOffers(genres, ageRestrictions);
        var tickets = await SeedTickets(seances, ticketDiscounts);
        await SeedOrders(tickets, offers);
        await SeedUsedTickets();

        await _context.SaveChangesAsync();
    }

    private static async Task<List<CinemaHall>> SeedCinemaHalls()
    {
        var cinemaHalls = new List<CinemaHall>
        {
            CinemaHall.Create(1, 240, 20),
            CinemaHall.Create(2, 240, 20),
            CinemaHall.Create(3, 360, 20),
            CinemaHall.Create(4, 360, 20),
            CinemaHall.Create(5, 240, 20),
            CinemaHall.Create(6, 240, 20),
            CinemaHall.Create(7, 360, 20),
            CinemaHall.Create(8, 360, 20),
        };

        foreach (var cinemaHall in cinemaHalls)
        {
            await _context.CinemaHalls.AddAsync(cinemaHall);
            await _context.SaveChangesAsync();
        }

        return cinemaHalls;
    }

    private static async Task<List<TicketDiscount>> SeedTicketDiscounts()
    {
        var discounts = new List<TicketDiscount>
        {
            TicketDiscount.Create("Zniżka studencka",
                "Zniżka przysługuje studentom majacym mniej niż 26 lat i posiadającym ważną legitymację studencką.",
                (decimal)0.75),
            TicketDiscount.Create("Zniżka ulgowa",
                "Zniżka przysługuje dzieciom poniżej 18 roku życia.",
                (decimal)0.5),
            TicketDiscount.Create("Zniżka kombatancka",
                "Zniżka przysługuje aktywnym żołnierzom lub żołnierzom w stanie spoczynku.",
                (decimal)0.4),
            TicketDiscount.Create("Zniżka dla seniorów",
                "Zniżka przysługuje osobom z ukończonymi 65 latami.",
                (decimal)0.8)
        };

        await _context.TicketDiscounts.AddRangeAsync(discounts);

        return discounts;
    }

    private static async Task<List<Movie>> SeedMovies(IReadOnlyDictionary<GenreId, Genre> genres,
        IReadOnlyDictionary<AgeRestrictionId, AgeRestriction> ageRestrictions)
    {
        var movies = new List<Movie>
        {
            Movie.Create(
                "Interstellar",
                new DateOnly(2014, 11, 7),
                169,
                "Epicki film science fiction z 2014 roku, którego współautorem, reżyserem i producentem jest " +
                "Christopher Nolan. W rolach głównych Matthew McConaughey, Anne Hathaway, Jessica Chastain, Bill Irwin, " +
                "Ellen Burstyn, Matt Damon i Michael Caine. Film osadzony jest w dystopijnej przyszłości, w której ludzkość " +
                "walczy o przetrwanie, film pokazuje grupę astronautów, którzy podróżują przez tunel czasoprzestrzenny" +
                " w pobliżu Saturna w poszukiwaniu nowego domu dla ludzkości.",
                ageRestrictions[AgeRestrictionId.OdLat13],
                new List<Genre> { genres[GenreId.ScienceFiction] }),
            Movie.Create("Batman",
                new DateOnly(2022, 3, 4),
                176,
                "Batman to amerykański film o superbohaterach oparty na postaci Batmana z DC Comics. Batman, który od" +
                " dwóch lat walczy z przestępczością w Gotham City, odkrywa korupcję, ścigając Człowieka-Zagadkę, seryjnego" +
                " mordercę, którego celem jest elita Gotham.",
                ageRestrictions[AgeRestrictionId.OdLat15],
                new List<Genre> { genres[GenreId.Akcja], genres[GenreId.ScienceFiction], genres[GenreId.Sensacyjny] }),
            Movie.Create("Nasze magiczne Encanto",
                new DateOnly(2021, 11, 26),
                110,
                "Film opowiada o rodzinie Madrigal, mieszkającej w magicznym zakątku zwanym Encanto, w górach Kolumbii." +
                " Jej członkowie w dzieciństwie zyskują niezwykłe zdolności, które w późniejszym czasie mają wykorzystywać by" +
                " pomagać innym, lecz piętnastoletnia Mirabel nie otrzymała żadnego daru. Okazuje się jednak, że to właśnie " +
                "ona musi ochronić rodzinę przed jej własnymi członkami.",
                ageRestrictions[AgeRestrictionId.BezOgraniczen],
                new List<Genre> { genres[GenreId.Animowany], genres[GenreId.Familijny], genres[GenreId.Musical] }),
            Movie.Create("To nie wypanda",
                new DateOnly(2022, 03, 11),
                100,
                "To nie wypanda to amerykańska animowana komputerowo komedia z 2022 roku, wyprodukowana przez " +
                "Pixar Animation Studios i dystrybuowana przez Walt Disney Studios Motion Pictures. Akcja filmu rozgrywająca" +
                " się w 2002 roku w Toronto w prowincji Ontario, podąża za Meilin „Mei” Lee, 13-letnią uczennicą z Kanady," +
                " która z powodu dziedzicznej klątwy przemienia się w wielką czerwoną pandę, gdy wyraża jakiekolwiek silne emocje.",
                ageRestrictions[AgeRestrictionId.OdLat7],
                new List<Genre> { genres[GenreId.Animowany], genres[GenreId.Komedia], genres[GenreId.Familijny] }
            )
        };

        await _context.Movies.AddRangeAsync(movies);

        return movies;
    }

    private static async Task<List<Seance>> SeedSeances(IReadOnlyList<Movie> movies,
        IReadOnlyList<CinemaHall> cinemaHalls)
    {
        var seances = new List<Seance>
        {
            Seance.Create(new DateTime(2022, 03, 28, 16, 0, 0), movies[0], cinemaHalls[0]),
            Seance.Create(new DateTime(2022, 03, 28, 16, 0, 0), movies[1], cinemaHalls[1]),
            Seance.Create(new DateTime(2022, 03, 28, 18, 0, 0), movies[2], cinemaHalls[0]),
            Seance.Create(new DateTime(2022, 03, 30, 12, 30, 0), movies[0], cinemaHalls[6]),
            Seance.Create(new DateTime(2022, 03, 30, 14, 15, 0), movies[1], cinemaHalls[1]),
            Seance.Create(new DateTime(2022, 04, 1, 16, 30, 0), movies[0], cinemaHalls[0]),
            Seance.Create(new DateTime(2022, 04, 1, 10, 30, 0), movies[2], cinemaHalls[7]),
            Seance.Create(new DateTime(2022, 04, 1, 14, 45, 0), movies[3], cinemaHalls[7]),
            Seance.Create(new DateTime(2022, 04, 2, 12, 30, 0), movies[2], cinemaHalls[2]),
            Seance.Create(new DateTime(2022, 04, 3, 14, 30, 0), movies[3], cinemaHalls[4]),
            Seance.Create(new DateTime(2022, 04, 3, 17, 45, 0), movies[3], cinemaHalls[4])
        };

        foreach (var seance in seances)
        {
            await _context.Seances.AddAsync(seance);
            await _context.SaveChangesAsync();
        }

        return seances;
    }

    private static async Task<List<Offer>> SeedOffers(IReadOnlyDictionary<GenreId, Genre> genres,
        IReadOnlyDictionary<AgeRestrictionId, AgeRestriction> ageRestrictions)
    {
        var offers = new List<Offer>
        {
            MovieGenreOffer.Create("Weekend z filmami SF",
                "Poczuj klimat przyszłości oglądająć filmy Science-Fiction! " +
                "Wszystkie bilety zakupione na filmy z oznaczeniem Science-Fiction -10%.",
                (decimal)0.9,
                genres[GenreId.ScienceFiction],
                Period.Create(new DateOnly(2022, 04, 02),
                    new DateOnly(2022, 04, 03),
                    new DateOnly(2022, 03, 03))),
            AgeOffer.Create("Rodzinny tydzień - Dorośli płacą tyle co dzieci!",
                "Ciesz się oglądaniem filmów wraz z dziećmi! " +
                "Zabierz dziecko na film oznaczony kategorią od lat 7 i zapłać tyle samo co dziecko.",
                (decimal)0.5, ageRestrictions[AgeRestrictionId.OdLat7],
                Period.Create(new DateOnly(2022, 03, 28),
                    new DateOnly(2022, 04, 03),
                    new DateOnly(2022, 03, 03))),
            AmountOffer.Create("4 bilety w cenie 3!",
                "Kup 4 bilety i zapłać za 3! Przy zakupie dowolnych 4 biletów, jeden bilet za 0 zł.",
                (decimal)0.0, 4, 1,
                Period.Create(new DateOnly(2022, 03, 28),
                    new DateOnly(2022, 04, 10),
                    new DateOnly(2022, 03, 03)))
        };

        await _context.Offers.AddRangeAsync(offers);

        return offers;
    }

    private static async Task<List<Ticket>> SeedTickets(IReadOnlyList<Seance> seances,
        IReadOnlyList<TicketDiscount> ticketDiscounts)
    {
        var tickets = new List<Ticket>
        {
            Ticket.Create(seances[0].SeanceSeats.First(ss => ss.Seat.Number == 1)),
            Ticket.Create(seances[0].SeanceSeats.First(ss => ss.Seat.Number == 2)),
            Ticket.Create(seances[0].SeanceSeats.First(ss => ss.Seat.Number == 3)),
            Ticket.Create(seances[7].SeanceSeats.First(ss => ss.Seat.Number == 107)),
            Ticket.Create(seances[7].SeanceSeats.First(ss => ss.Seat.Number == 108)),
            Ticket.Create(seances[8].SeanceSeats.First(ss => ss.Seat.Number == 217), ticketDiscounts[3]),
            Ticket.Create(seances[4].SeanceSeats.First(ss => ss.Seat.Number == 63), ticketDiscounts[1]),
            Ticket.Create(seances[4].SeanceSeats.First(ss => ss.Seat.Number == 64)),
        };

        await _context.Tickets.AddRangeAsync(tickets);

        return tickets;
    }

    private static async Task SeedOrders(IReadOnlyList<Ticket> tickets, IReadOnlyList<Offer> offers)
    {
        var orders = new List<Order>
        {
            Order.Create(new DateTime(2022, 03, 27, 14, 34, 54),
                new List<Ticket>
                {
                    tickets[0], tickets[1], tickets[2]
                },
                null, null, (MovieGenreOffer)offers[0]),
            Order.Create(new DateTime(2022, 03, 28, 13, 59, 13),
                new List<Ticket>
                {
                    tickets[3], tickets[4]
                }, (AgeOffer)offers[1]),
            Order.Create(new DateTime(2022, 03, 25, 07, 13, 20),
                new List<Ticket>
                {
                    tickets[5]
                }),
            Order.Create(new DateTime(2022, 03, 26, 21, 18, 31),
                new List<Ticket>
                {
                    tickets[6], tickets[7]
                })
        };

        await _context.Orders.AddRangeAsync(orders);
    }

    private static async Task SeedUsedTickets()
    {
        var usedTicket = UsedTicket.Create("1164-756790-3777", "Batman",
                new DateTime(2022, 03, 13, 15, 30, 0),
                Price.Create(0), null, null);

        await _context.UsedTickets.AddAsync(usedTicket);
    }
}