using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class AddTicketSeanceSeatRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Seances_SeanceId",
                table: "Tickets");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Seats_SeatId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_SeanceId",
                table: "Tickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SeanceSeat",
                table: "SeanceSeat");

            migrationBuilder.DropColumn(
                name: "SeanceId",
                table: "Tickets");

            migrationBuilder.RenameColumn(
                name: "SeatId",
                table: "Tickets",
                newName: "SeanceSeatId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_SeatId",
                table: "Tickets",
                newName: "IX_Tickets_SeanceSeatId");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "SeanceSeat",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeanceSeat",
                table: "SeanceSeat",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SeanceSeat_SeanceId",
                table: "SeanceSeat",
                column: "SeanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_SeanceSeat_SeanceSeatId",
                table: "Tickets",
                column: "SeanceSeatId",
                principalTable: "SeanceSeat",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_SeanceSeat_SeanceSeatId",
                table: "Tickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SeanceSeat",
                table: "SeanceSeat");

            migrationBuilder.DropIndex(
                name: "IX_SeanceSeat_SeanceId",
                table: "SeanceSeat");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "SeanceSeat");

            migrationBuilder.RenameColumn(
                name: "SeanceSeatId",
                table: "Tickets",
                newName: "SeatId");

            migrationBuilder.RenameIndex(
                name: "IX_Tickets_SeanceSeatId",
                table: "Tickets",
                newName: "IX_Tickets_SeatId");

            migrationBuilder.AddColumn<int>(
                name: "SeanceId",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SeanceSeat",
                table: "SeanceSeat",
                columns: new[] { "SeanceId", "SeatId" });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_SeanceId",
                table: "Tickets",
                column: "SeanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Seances_SeanceId",
                table: "Tickets",
                column: "SeanceId",
                principalTable: "Seances",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Seats_SeatId",
                table: "Tickets",
                column: "SeatId",
                principalTable: "Seats",
                principalColumn: "Id");
        }
    }
}
