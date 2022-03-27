﻿// <auto-generated />
using System;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220327185556_ChangeSomeRelations")]
    partial class ChangeSomeRelations
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Domain.Entities.AgeConstraint", b =>
                {
                    b.Property<byte>("Id")
                        .HasColumnType("tinyint");

                    b.Property<byte>("MinAge")
                        .HasColumnType("tinyint");

                    b.HasKey("Id");

                    b.ToTable("AgeConstraints", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.AgeOffer", b =>
                {
                    b.Property<short>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<short>("Id"), 1L, 1);

                    b.Property<byte>("AgeConstraintId")
                        .HasColumnType("tinyint");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<decimal>("DiscountValue")
                        .HasPrecision(3, 2)
                        .HasColumnType("decimal(3,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("AgeConstraintId")
                        .IsUnique();

                    b.ToTable("AgeOffers");
                });

            modelBuilder.Entity("Domain.Entities.AmountOffer", b =>
                {
                    b.Property<short>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<short>("Id"), 1L, 1);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<decimal>("DiscountValue")
                        .HasPrecision(3, 2)
                        .HasColumnType("decimal(3,2)");

                    b.Property<byte>("DiscountedNumberOfTickets")
                        .HasColumnType("tinyint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<byte>("RequiredNumberOfTickets")
                        .HasColumnType("tinyint");

                    b.HasKey("Id");

                    b.ToTable("AmountOffers");
                });

            modelBuilder.Entity("Domain.Entities.CinemaHall", b =>
                {
                    b.Property<byte>("Id")
                        .HasColumnType("tinyint");

                    b.Property<byte>("HallNumber")
                        .HasColumnType("tinyint");

                    b.Property<short>("NumberOfSeats")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint")
                        .HasDefaultValue((short)256);

                    b.HasKey("Id");

                    b.ToTable("CinemaHalls");
                });

            modelBuilder.Entity("Domain.Entities.Genre", b =>
                {
                    b.Property<byte>("Id")
                        .HasColumnType("tinyint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Genre");
                });

            modelBuilder.Entity("Domain.Entities.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte>("AgeConstraintId")
                        .HasColumnType("tinyint");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<short>("Duration")
                        .HasColumnType("smallint");

                    b.Property<byte[]>("Image")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("date");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("AgeConstraintId");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("Domain.Entities.MovieGenre", b =>
                {
                    b.Property<int>("MovieId")
                        .HasColumnType("int");

                    b.Property<byte>("GenreId")
                        .HasColumnType("tinyint");

                    b.HasKey("MovieId", "GenreId");

                    b.HasIndex("GenreId");

                    b.ToTable("MovieGenre");
                });

            modelBuilder.Entity("Domain.Entities.MovieGenreOffer", b =>
                {
                    b.Property<short>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<short>("Id"), 1L, 1);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<decimal>("DiscountValue")
                        .HasPrecision(3, 2)
                        .HasColumnType("decimal(3,2)");

                    b.Property<byte>("GenreId")
                        .HasColumnType("tinyint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("GenreId")
                        .IsUnique();

                    b.ToTable("MovieGenreOffers");
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<short>("AgeOfferId")
                        .HasColumnType("smallint");

                    b.Property<short>("AmountOfferId")
                        .HasColumnType("smallint");

                    b.Property<DateTime>("DateTimeOfOrder")
                        .HasColumnType("datetime");

                    b.Property<short>("MovieGenreOfferId")
                        .HasColumnType("smallint");

                    b.Property<string>("Number")
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasMaxLength(9)
                        .HasColumnType("nvarchar(9)")
                        .HasComputedColumnSql("FORMAT([Id],'d9')");

                    b.HasKey("Id");

                    b.HasIndex("AgeOfferId");

                    b.HasIndex("AmountOfferId");

                    b.HasIndex("MovieGenreOfferId");

                    b.ToTable("Order");
                });

            modelBuilder.Entity("Domain.Entities.Seance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte>("CinemaHallId")
                        .HasColumnType("tinyint");

                    b.Property<int>("MovieId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDateTime")
                        .HasColumnType("smalldatetime");

                    b.HasKey("Id");

                    b.HasIndex("CinemaHallId");

                    b.HasIndex("MovieId");

                    b.ToTable("Seances");
                });

            modelBuilder.Entity("Domain.Entities.SeanceSeat", b =>
                {
                    b.Property<int>("SeanceId")
                        .HasColumnType("int");

                    b.Property<int>("SeatId")
                        .HasColumnType("int");

                    b.HasKey("SeanceId", "SeatId");

                    b.HasIndex("SeatId");

                    b.ToTable("SeanceSeat");
                });

            modelBuilder.Entity("Domain.Entities.Seat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<byte>("CinemaHallId")
                        .HasColumnType("tinyint");

                    b.Property<byte>("Number")
                        .HasColumnType("tinyint");

                    b.Property<string>("Row")
                        .IsRequired()
                        .HasMaxLength(1)
                        .HasColumnType("char(1)");

                    b.Property<int>("TicketId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CinemaHallId");

                    b.HasIndex("TicketId")
                        .IsUnique();

                    b.ToTable("Seats");
                });

            modelBuilder.Entity("Domain.Entities.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Number")
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasMaxLength(9)
                        .HasColumnType("nvarchar(9)")
                        .HasComputedColumnSql("FORMAT([Id],'d9')");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int>("SeanceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("SeanceId");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("Domain.Entities.UsedTicket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DiscountName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("MovieTitle")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Number")
                        .IsRequired()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasMaxLength(9)
                        .HasColumnType("nvarchar(9)")
                        .HasComputedColumnSql("FORMAT([Id],'d9')");

                    b.Property<string>("OfferName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("SeanceDateTime")
                        .HasColumnType("smalldatetime");

                    b.HasKey("Id");

                    b.ToTable("UsedTickets");
                });

            modelBuilder.Entity("Domain.Entities.AgeOffer", b =>
                {
                    b.HasOne("Domain.Entities.AgeConstraint", "AgeConstraint")
                        .WithOne("AgeOffer")
                        .HasForeignKey("Domain.Entities.AgeOffer", "AgeConstraintId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AgeConstraint");
                });

            modelBuilder.Entity("Domain.Entities.Movie", b =>
                {
                    b.HasOne("Domain.Entities.AgeConstraint", "AgeConstraint")
                        .WithMany("Movies")
                        .HasForeignKey("AgeConstraintId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AgeConstraint");
                });

            modelBuilder.Entity("Domain.Entities.MovieGenre", b =>
                {
                    b.HasOne("Domain.Entities.Genre", "Genre")
                        .WithMany("MovieGenres")
                        .HasForeignKey("GenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Movie", "Movie")
                        .WithMany("MovieGenres")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Genre");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("Domain.Entities.MovieGenreOffer", b =>
                {
                    b.HasOne("Domain.Entities.Genre", "Genre")
                        .WithOne("MovieGenreOffer")
                        .HasForeignKey("Domain.Entities.MovieGenreOffer", "GenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Genre");
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.HasOne("Domain.Entities.AgeOffer", "AgeOffer")
                        .WithMany("Orders")
                        .HasForeignKey("AgeOfferId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.AmountOffer", "AmountOffer")
                        .WithMany("Orders")
                        .HasForeignKey("AmountOfferId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.MovieGenreOffer", "MovieGenreOffer")
                        .WithMany("Orders")
                        .HasForeignKey("MovieGenreOfferId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AgeOffer");

                    b.Navigation("AmountOffer");

                    b.Navigation("MovieGenreOffer");
                });

            modelBuilder.Entity("Domain.Entities.Seance", b =>
                {
                    b.HasOne("Domain.Entities.CinemaHall", "CinemaHall")
                        .WithMany("Seances")
                        .HasForeignKey("CinemaHallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Movie", "Movie")
                        .WithMany("Seances")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CinemaHall");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("Domain.Entities.SeanceSeat", b =>
                {
                    b.HasOne("Domain.Entities.Seance", "Seance")
                        .WithMany("SeanceSeats")
                        .HasForeignKey("SeanceId")
                        .IsRequired();

                    b.HasOne("Domain.Entities.Seat", "Seat")
                        .WithMany("SeanceSeats")
                        .HasForeignKey("SeatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Seance");

                    b.Navigation("Seat");
                });

            modelBuilder.Entity("Domain.Entities.Seat", b =>
                {
                    b.HasOne("Domain.Entities.CinemaHall", "CinemaHall")
                        .WithMany("Seats")
                        .HasForeignKey("CinemaHallId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Ticket", "Ticket")
                        .WithOne("Seat")
                        .HasForeignKey("Domain.Entities.Seat", "TicketId")
                        .IsRequired();

                    b.Navigation("CinemaHall");

                    b.Navigation("Ticket");
                });

            modelBuilder.Entity("Domain.Entities.Ticket", b =>
                {
                    b.HasOne("Domain.Entities.Order", "Order")
                        .WithMany("Tickets")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Seance", "Seance")
                        .WithMany("Tickets")
                        .HasForeignKey("SeanceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("Domain.ValueObjects.Price", "Price", b1 =>
                        {
                            b1.Property<int>("TicketId")
                                .HasColumnType("int");

                            b1.Property<decimal>("BasePrice")
                                .HasPrecision(4, 2)
                                .HasColumnType("decimal(4,2)")
                                .HasColumnName("BasePrice");

                            b1.Property<decimal>("DiscountedPrice")
                                .HasPrecision(4, 2)
                                .HasColumnType("decimal(4,2)")
                                .HasColumnName("DiscountedPrice");

                            b1.HasKey("TicketId");

                            b1.ToTable("Tickets");

                            b1.WithOwner()
                                .HasForeignKey("TicketId");
                        });

                    b.OwnsOne("Domain.ValueObjects.TicketDiscount", "TicketDiscount", b1 =>
                        {
                            b1.Property<int>("TicketId")
                                .HasColumnType("int");

                            b1.Property<string>("Description")
                                .IsRequired()
                                .HasMaxLength(200)
                                .HasColumnType("nvarchar(200)")
                                .HasColumnName("DiscountDescription");

                            b1.Property<decimal>("DiscountValue")
                                .HasPrecision(3, 2)
                                .HasColumnType("decimal(3,2)")
                                .HasColumnName("DiscountValue");

                            b1.Property<string>("Name")
                                .IsRequired()
                                .HasMaxLength(50)
                                .HasColumnType("nvarchar(50)")
                                .HasColumnName("DiscountName");

                            b1.HasKey("TicketId");

                            b1.ToTable("Tickets");

                            b1.WithOwner()
                                .HasForeignKey("TicketId");
                        });

                    b.Navigation("Order");

                    b.Navigation("Price")
                        .IsRequired();

                    b.Navigation("Seance");

                    b.Navigation("TicketDiscount")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.UsedTicket", b =>
                {
                    b.OwnsOne("Domain.ValueObjects.Price", "Price", b1 =>
                        {
                            b1.Property<int>("UsedTicketId")
                                .HasColumnType("int");

                            b1.Property<decimal>("BasePrice")
                                .HasPrecision(4, 2)
                                .HasColumnType("decimal(4,2)")
                                .HasColumnName("BasePrice");

                            b1.Property<decimal>("DiscountedPrice")
                                .HasPrecision(4, 2)
                                .HasColumnType("decimal(4,2)")
                                .HasColumnName("DiscountedPrice");

                            b1.HasKey("UsedTicketId");

                            b1.ToTable("UsedTickets");

                            b1.WithOwner()
                                .HasForeignKey("UsedTicketId");
                        });

                    b.Navigation("Price")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.AgeConstraint", b =>
                {
                    b.Navigation("AgeOffer")
                        .IsRequired();

                    b.Navigation("Movies");
                });

            modelBuilder.Entity("Domain.Entities.AgeOffer", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("Domain.Entities.AmountOffer", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("Domain.Entities.CinemaHall", b =>
                {
                    b.Navigation("Seances");

                    b.Navigation("Seats");
                });

            modelBuilder.Entity("Domain.Entities.Genre", b =>
                {
                    b.Navigation("MovieGenreOffer")
                        .IsRequired();

                    b.Navigation("MovieGenres");
                });

            modelBuilder.Entity("Domain.Entities.Movie", b =>
                {
                    b.Navigation("MovieGenres");

                    b.Navigation("Seances");
                });

            modelBuilder.Entity("Domain.Entities.MovieGenreOffer", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.Navigation("Tickets");
                });

            modelBuilder.Entity("Domain.Entities.Seance", b =>
                {
                    b.Navigation("SeanceSeats");

                    b.Navigation("Tickets");
                });

            modelBuilder.Entity("Domain.Entities.Seat", b =>
                {
                    b.Navigation("SeanceSeats");
                });

            modelBuilder.Entity("Domain.Entities.Ticket", b =>
                {
                    b.Navigation("Seat")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
