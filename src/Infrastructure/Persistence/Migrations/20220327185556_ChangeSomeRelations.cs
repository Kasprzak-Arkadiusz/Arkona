using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class ChangeSomeRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieGenreOffers_Genre_MovieGenreId",
                table: "MovieGenreOffers");

            migrationBuilder.DropIndex(
                name: "IX_Seances_CinemaHallId",
                table: "Seances");

            migrationBuilder.DropIndex(
                name: "IX_MovieGenreOffers_MovieGenreId",
                table: "MovieGenreOffers");

            migrationBuilder.RenameColumn(
                name: "MovieGenreId",
                table: "MovieGenreOffers",
                newName: "GenreId");

            migrationBuilder.AddColumn<byte[]>(
                name: "Image",
                table: "Movies",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0]);

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
                name: "IX_Seances_CinemaHallId",
                table: "Seances",
                column: "CinemaHallId");

            migrationBuilder.CreateIndex(
                name: "IX_MovieGenreOffers_GenreId",
                table: "MovieGenreOffers",
                column: "GenreId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SeanceSeat_SeatId",
                table: "SeanceSeat",
                column: "SeatId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieGenreOffers_Genre_GenreId",
                table: "MovieGenreOffers",
                column: "GenreId",
                principalTable: "Genre",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieGenreOffers_Genre_GenreId",
                table: "MovieGenreOffers");

            migrationBuilder.DropTable(
                name: "SeanceSeat");

            migrationBuilder.DropIndex(
                name: "IX_Seances_CinemaHallId",
                table: "Seances");

            migrationBuilder.DropIndex(
                name: "IX_MovieGenreOffers_GenreId",
                table: "MovieGenreOffers");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Movies");

            migrationBuilder.RenameColumn(
                name: "GenreId",
                table: "MovieGenreOffers",
                newName: "MovieGenreId");

            migrationBuilder.CreateIndex(
                name: "IX_Seances_CinemaHallId",
                table: "Seances",
                column: "CinemaHallId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MovieGenreOffers_MovieGenreId",
                table: "MovieGenreOffers",
                column: "MovieGenreId");

            migrationBuilder.AddForeignKey(
                name: "FK_MovieGenreOffers_Genre_MovieGenreId",
                table: "MovieGenreOffers",
                column: "MovieGenreId",
                principalTable: "Genre",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
