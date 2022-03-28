﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class NewCleanMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AgeConstraints",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MinAge = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgeConstraints", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CinemaHalls",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HallNumber = table.Column<byte>(type: "tinyint", nullable: false),
                    NumberOfSeats = table.Column<short>(type: "smallint", nullable: false, defaultValue: (short)256)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CinemaHalls", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Genres",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genres", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsedTickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false, computedColumnSql: "FORMAT([Id],'d9')"),
                    MovieTitle = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SeanceDateTime = table.Column<DateTime>(type: "smalldatetime", nullable: false),
                    BasePrice = table.Column<decimal>(type: "decimal(4,2)", precision: 4, scale: 2, nullable: false),
                    DiscountedPrice = table.Column<decimal>(type: "decimal(4,2)", precision: 4, scale: 2, nullable: false),
                    DiscountName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    OfferName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsedTickets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Movies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Image = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ReleaseDate = table.Column<DateTime>(type: "date", nullable: false),
                    Duration = table.Column<short>(type: "smallint", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    AgeConstraintId = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Movies_AgeConstraints_AgeConstraintId",
                        column: x => x.AgeConstraintId,
                        principalTable: "AgeConstraints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Offers",
                columns: table => new
                {
                    Id = table.Column<short>(type: "smallint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ValidFrom = table.Column<DateTime>(type: "date", nullable: false),
                    ValidTo = table.Column<DateTime>(type: "date", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    DiscountValue = table.Column<decimal>(type: "decimal(3,2)", precision: 3, scale: 2, nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AgeConstraintId = table.Column<byte>(type: "tinyint", nullable: true),
                    RequiredNumberOfTickets = table.Column<byte>(type: "tinyint", nullable: true),
                    DiscountedNumberOfTickets = table.Column<byte>(type: "tinyint", nullable: true),
                    GenreId = table.Column<byte>(type: "tinyint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Offers_AgeConstraints_AgeConstraintId",
                        column: x => x.AgeConstraintId,
                        principalTable: "AgeConstraints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Offers_Genres_GenreId",
                        column: x => x.GenreId,
                        principalTable: "Genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MovieGenre",
                columns: table => new
                {
                    GenreId = table.Column<byte>(type: "tinyint", nullable: false),
                    MovieId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MovieGenre", x => new { x.MovieId, x.GenreId });
                    table.ForeignKey(
                        name: "FK_MovieGenre_Genres_GenreId",
                        column: x => x.GenreId,
                        principalTable: "Genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MovieGenre_Movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Seances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StartDateTime = table.Column<DateTime>(type: "smalldatetime", nullable: false),
                    MovieId = table.Column<int>(type: "int", nullable: false),
                    CinemaHallId = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seances_CinemaHalls_CinemaHallId",
                        column: x => x.CinemaHallId,
                        principalTable: "CinemaHalls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Seances_Movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "Movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false, computedColumnSql: "FORMAT([Id],'d9')"),
                    DateTimeOfOrder = table.Column<DateTime>(type: "datetime", nullable: false),
                    AgeOfferId = table.Column<short>(type: "smallint", nullable: false),
                    AmountOfferId = table.Column<short>(type: "smallint", nullable: false),
                    MovieGenreOfferId = table.Column<short>(type: "smallint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Offers_AgeOfferId",
                        column: x => x.AgeOfferId,
                        principalTable: "Offers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_Offers_AmountOfferId",
                        column: x => x.AmountOfferId,
                        principalTable: "Offers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Orders_Offers_MovieGenreOfferId",
                        column: x => x.MovieGenreOfferId,
                        principalTable: "Offers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<string>(type: "nvarchar(9)", maxLength: 9, nullable: false, computedColumnSql: "FORMAT([Id],'d9')"),
                    BasePrice = table.Column<decimal>(type: "decimal(4,2)", precision: 4, scale: 2, nullable: false),
                    DiscountedPrice = table.Column<decimal>(type: "decimal(4,2)", precision: 4, scale: 2, nullable: false),
                    DiscountName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DiscountDescription = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DiscountValue = table.Column<decimal>(type: "decimal(3,2)", precision: 3, scale: 2, nullable: false),
                    SeanceId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Seances_SeanceId",
                        column: x => x.SeanceId,
                        principalTable: "Seances",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Seats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Number = table.Column<byte>(type: "tinyint", nullable: false),
                    Row = table.Column<string>(type: "char(1)", maxLength: 1, nullable: false),
                    CinemaHallId = table.Column<byte>(type: "tinyint", nullable: false),
                    TicketId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Seats_CinemaHalls_CinemaHallId",
                        column: x => x.CinemaHallId,
                        principalTable: "CinemaHalls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Seats_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SeanceSeat",
                columns: table => new
                {
                    SeanceId = table.Column<int>(type: "int", nullable: false),
                    SeatId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeanceSeat", x => new { x.SeanceId, x.SeatId });
                    table.ForeignKey(
                        name: "FK_SeanceSeat_Seances_SeanceId",
                        column: x => x.SeanceId,
                        principalTable: "Seances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SeanceSeat_Seats_SeatId",
                        column: x => x.SeatId,
                        principalTable: "Seats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovieGenre_GenreId",
                table: "MovieGenre",
                column: "GenreId");

            migrationBuilder.CreateIndex(
                name: "IX_Movies_AgeConstraintId",
                table: "Movies",
                column: "AgeConstraintId");

            migrationBuilder.CreateIndex(
                name: "IX_Offers_AgeConstraintId",
                table: "Offers",
                column: "AgeConstraintId",
                unique: true,
                filter: "[AgeConstraintId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Offers_GenreId",
                table: "Offers",
                column: "GenreId",
                unique: true,
                filter: "[GenreId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AgeOfferId",
                table: "Orders",
                column: "AgeOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AmountOfferId",
                table: "Orders",
                column: "AmountOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MovieGenreOfferId",
                table: "Orders",
                column: "MovieGenreOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Seances_CinemaHallId",
                table: "Seances",
                column: "CinemaHallId");

            migrationBuilder.CreateIndex(
                name: "IX_Seances_MovieId",
                table: "Seances",
                column: "MovieId");

            migrationBuilder.CreateIndex(
                name: "IX_SeanceSeat_SeatId",
                table: "SeanceSeat",
                column: "SeatId");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_CinemaHallId",
                table: "Seats",
                column: "CinemaHallId");

            migrationBuilder.CreateIndex(
                name: "IX_Seats_TicketId",
                table: "Seats",
                column: "TicketId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_OrderId",
                table: "Tickets",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_SeanceId",
                table: "Tickets",
                column: "SeanceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MovieGenre");

            migrationBuilder.DropTable(
                name: "SeanceSeat");

            migrationBuilder.DropTable(
                name: "UsedTickets");

            migrationBuilder.DropTable(
                name: "Seats");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Seances");

            migrationBuilder.DropTable(
                name: "Offers");

            migrationBuilder.DropTable(
                name: "CinemaHalls");

            migrationBuilder.DropTable(
                name: "Movies");

            migrationBuilder.DropTable(
                name: "Genres");

            migrationBuilder.DropTable(
                name: "AgeConstraints");
        }
    }
}