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
    [Migration("20220501160757_RefactorOffers")]
    partial class RefactorOffers
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Domain.Entities.AgeRestriction", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<byte>("MinAge")
                        .HasColumnType("tinyint");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("AgeRestrictions", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 0,
                            MinAge = (byte)0,
                            Name = "Bez ograniczeń"
                        },
                        new
                        {
                            Id = 3,
                            MinAge = (byte)3,
                            Name = "Od lat 3"
                        },
                        new
                        {
                            Id = 7,
                            MinAge = (byte)7,
                            Name = "Od lat 7"
                        },
                        new
                        {
                            Id = 13,
                            MinAge = (byte)13,
                            Name = "Od lat 13"
                        },
                        new
                        {
                            Id = 15,
                            MinAge = (byte)15,
                            Name = "Od lat 15"
                        });
                });

            modelBuilder.Entity("Domain.Entities.CinemaHall", b =>
                {
                    b.Property<byte>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<byte>("Id"), 1L, 1);

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
                    b.Property<int>("Id")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Genres");

                    b.HasData(
                        new
                        {
                            Id = 0,
                            Name = "Akcja"
                        },
                        new
                        {
                            Id = 1,
                            Name = "Animowany"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Biograficzny"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Dramat"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Familijny"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Fantasy"
                        },
                        new
                        {
                            Id = 6,
                            Name = "Horror"
                        },
                        new
                        {
                            Id = 7,
                            Name = "Komedia"
                        },
                        new
                        {
                            Id = 8,
                            Name = "Komedia romantyczna"
                        },
                        new
                        {
                            Id = 9,
                            Name = "Kryminał"
                        },
                        new
                        {
                            Id = 10,
                            Name = "Musical"
                        },
                        new
                        {
                            Id = 11,
                            Name = "Obyczajowy"
                        },
                        new
                        {
                            Id = 12,
                            Name = "Przygodowy"
                        },
                        new
                        {
                            Id = 13,
                            Name = "Romans"
                        },
                        new
                        {
                            Id = 14,
                            Name = "Science Fiction"
                        },
                        new
                        {
                            Id = 15,
                            Name = "Sensacyjny"
                        },
                        new
                        {
                            Id = 16,
                            Name = "Thriller"
                        },
                        new
                        {
                            Id = 17,
                            Name = "Fantastyka"
                        });
                });

            modelBuilder.Entity("Domain.Entities.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("AgeRestrictionId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<short>("Duration")
                        .HasColumnType("smallint");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("date");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("AgeRestrictionId");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("Domain.Entities.MovieGenre", b =>
                {
                    b.Property<int>("MovieId")
                        .HasColumnType("int");

                    b.Property<int>("GenreId")
                        .HasColumnType("int");

                    b.HasKey("MovieId", "GenreId");

                    b.HasIndex("GenreId");

                    b.ToTable("MovieGenre");
                });

            modelBuilder.Entity("Domain.Entities.Offer", b =>
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

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Offers");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Offer");
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("DateTimeOfOrder")
                        .HasColumnType("datetime");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasMaxLength(16)
                        .HasColumnType("nvarchar(16)");

                    b.Property<short?>("OfferId")
                        .HasColumnType("smallint");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("OfferId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
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
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("SeanceId")
                        .HasColumnType("int");

                    b.Property<int>("SeatId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SeanceId");

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

                    b.Property<short>("Number")
                        .HasColumnType("smallint");

                    b.Property<string>("Row")
                        .IsRequired()
                        .HasMaxLength(1)
                        .HasColumnType("char(1)");

                    b.HasKey("Id");

                    b.HasIndex("CinemaHallId");

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
                        .HasMaxLength(16)
                        .HasColumnType("nvarchar(16)");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int>("SeanceSeatId")
                        .HasColumnType("int");

                    b.Property<byte?>("TicketDiscountId")
                        .HasColumnType("tinyint");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("SeanceSeatId")
                        .IsUnique();

                    b.HasIndex("TicketDiscountId");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("Domain.Entities.TicketDiscount", b =>
                {
                    b.Property<byte>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<byte>("Id"), 1L, 1);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<decimal>("DiscountValue")
                        .HasPrecision(3, 2)
                        .HasColumnType("decimal(3,2)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("TicketDiscounts");
                });

            modelBuilder.Entity("Domain.Entities.UsedTicket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("DiscountName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("MovieTitle")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasMaxLength(16)
                        .HasColumnType("nvarchar(16)");

                    b.Property<string>("OfferName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("SeanceDateTime")
                        .HasColumnType("smalldatetime");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UsedTickets");
                });

            modelBuilder.Entity("Infrastructure.Identity.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.AgeOffer", b =>
                {
                    b.HasBaseType("Domain.Entities.Offer");

                    b.Property<int>("AgeRestrictionId")
                        .HasColumnType("int");

                    b.HasIndex("AgeRestrictionId")
                        .IsUnique()
                        .HasFilter("[AgeRestrictionId] IS NOT NULL");

                    b.HasDiscriminator().HasValue("AgeOffer");
                });

            modelBuilder.Entity("Domain.Entities.AmountOffer", b =>
                {
                    b.HasBaseType("Domain.Entities.Offer");

                    b.Property<byte>("DiscountedNumberOfTickets")
                        .HasColumnType("tinyint");

                    b.Property<byte>("RequiredNumberOfTickets")
                        .HasColumnType("tinyint");

                    b.HasDiscriminator().HasValue("AmountOffer");
                });

            modelBuilder.Entity("Domain.Entities.MovieGenreOffer", b =>
                {
                    b.HasBaseType("Domain.Entities.Offer");

                    b.Property<int>("GenreId")
                        .HasColumnType("int");

                    b.HasIndex("GenreId")
                        .IsUnique()
                        .HasFilter("[GenreId] IS NOT NULL");

                    b.HasDiscriminator().HasValue("MovieGenreOffer");
                });

            modelBuilder.Entity("Domain.Entities.Movie", b =>
                {
                    b.HasOne("Domain.Entities.AgeRestriction", "AgeRestriction")
                        .WithMany("Movies")
                        .HasForeignKey("AgeRestrictionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AgeRestriction");
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

            modelBuilder.Entity("Domain.Entities.Offer", b =>
                {
                    b.OwnsOne("Domain.ValueObjects.Period", "ValidPeriod", b1 =>
                        {
                            b1.Property<short>("OfferId")
                                .HasColumnType("smallint");

                            b1.Property<DateTime>("ValidFrom")
                                .HasColumnType("date")
                                .HasColumnName("ValidFrom");

                            b1.Property<DateTime>("ValidTo")
                                .HasColumnType("date")
                                .HasColumnName("ValidTo");

                            b1.HasKey("OfferId");

                            b1.ToTable("Offers");

                            b1.WithOwner()
                                .HasForeignKey("OfferId");
                        });

                    b.Navigation("ValidPeriod")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.Order", b =>
                {
                    b.HasOne("Domain.Entities.Offer", "Offer")
                        .WithMany("Orders")
                        .HasForeignKey("OfferId");

                    b.HasOne("Infrastructure.Identity.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Offer");
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

                    b.Navigation("CinemaHall");
                });

            modelBuilder.Entity("Domain.Entities.Ticket", b =>
                {
                    b.HasOne("Domain.Entities.Order", "Order")
                        .WithMany("Tickets")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.SeanceSeat", "SeanceSeat")
                        .WithOne("Ticket")
                        .HasForeignKey("Domain.Entities.Ticket", "SeanceSeatId")
                        .IsRequired();

                    b.HasOne("Domain.Entities.TicketDiscount", "TicketDiscount")
                        .WithMany("Tickets")
                        .HasForeignKey("TicketDiscountId");

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

                    b.Navigation("Order");

                    b.Navigation("Price")
                        .IsRequired();

                    b.Navigation("SeanceSeat");

                    b.Navigation("TicketDiscount");
                });

            modelBuilder.Entity("Domain.Entities.UsedTicket", b =>
                {
                    b.HasOne("Infrastructure.Identity.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

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

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Infrastructure.Identity.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Infrastructure.Identity.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Infrastructure.Identity.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Infrastructure.Identity.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.AgeOffer", b =>
                {
                    b.HasOne("Domain.Entities.AgeRestriction", "AgeRestriction")
                        .WithOne("AgeOffer")
                        .HasForeignKey("Domain.Entities.AgeOffer", "AgeRestrictionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AgeRestriction");
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

            modelBuilder.Entity("Domain.Entities.AgeRestriction", b =>
                {
                    b.Navigation("AgeOffer")
                        .IsRequired();

                    b.Navigation("Movies");
                });

            modelBuilder.Entity("Domain.Entities.CinemaHall", b =>
                {
                    b.Navigation("Seances");

                    b.Navigation("Seats");
                });

            modelBuilder.Entity("Domain.Entities.Genre", b =>
                {
                    b.Navigation("MovieGenreOffer");

                    b.Navigation("MovieGenres");
                });

            modelBuilder.Entity("Domain.Entities.Movie", b =>
                {
                    b.Navigation("MovieGenres");

                    b.Navigation("Seances");
                });

            modelBuilder.Entity("Domain.Entities.Offer", b =>
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
                });

            modelBuilder.Entity("Domain.Entities.SeanceSeat", b =>
                {
                    b.Navigation("Ticket");
                });

            modelBuilder.Entity("Domain.Entities.Seat", b =>
                {
                    b.Navigation("SeanceSeats");
                });

            modelBuilder.Entity("Domain.Entities.TicketDiscount", b =>
                {
                    b.Navigation("Tickets");
                });
#pragma warning restore 612, 618
        }
    }
}
