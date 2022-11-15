using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class AddRefreshTokens : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SeanceSeat_Seances_SeanceId",
                table: "SeanceSeat");

            migrationBuilder.DropForeignKey(
                name: "FK_SeanceSeat_Seats_SeatId",
                table: "SeanceSeat");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_SeanceSeat_SeanceSeatId",
                table: "Tickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SeanceSeat",
                table: "SeanceSeat");

            migrationBuilder.RenameTable(
                name: "SeanceSeat",
                newName: "SeanceSeats");

            migrationBuilder.RenameIndex(
                name: "IX_SeanceSeat_SeatId",
                table: "SeanceSeats",
                newName: "IX_SeanceSeats_SeatId");

            migrationBuilder.RenameIndex(
                name: "IX_SeanceSeat_SeanceId",
                table: "SeanceSeats",
                newName: "IX_SeanceSeats_SeanceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeanceSeats",
                table: "SeanceSeats",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TokenValue = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SeanceSeats_Seances_SeanceId",
                table: "SeanceSeats",
                column: "SeanceId",
                principalTable: "Seances",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SeanceSeats_Seats_SeatId",
                table: "SeanceSeats",
                column: "SeatId",
                principalTable: "Seats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_SeanceSeats_SeanceSeatId",
                table: "Tickets",
                column: "SeanceSeatId",
                principalTable: "SeanceSeats",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SeanceSeats_Seances_SeanceId",
                table: "SeanceSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_SeanceSeats_Seats_SeatId",
                table: "SeanceSeats");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_SeanceSeats_SeanceSeatId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SeanceSeats",
                table: "SeanceSeats");

            migrationBuilder.RenameTable(
                name: "SeanceSeats",
                newName: "SeanceSeat");

            migrationBuilder.RenameIndex(
                name: "IX_SeanceSeats_SeatId",
                table: "SeanceSeat",
                newName: "IX_SeanceSeat_SeatId");

            migrationBuilder.RenameIndex(
                name: "IX_SeanceSeats_SeanceId",
                table: "SeanceSeat",
                newName: "IX_SeanceSeat_SeanceId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeanceSeat",
                table: "SeanceSeat",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SeanceSeat_Seances_SeanceId",
                table: "SeanceSeat",
                column: "SeanceId",
                principalTable: "Seances",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SeanceSeat_Seats_SeatId",
                table: "SeanceSeat",
                column: "SeatId",
                principalTable: "Seats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_SeanceSeat_SeanceSeatId",
                table: "Tickets",
                column: "SeanceSeatId",
                principalTable: "SeanceSeat",
                principalColumn: "Id");
        }
    }
}
