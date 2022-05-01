using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class RefactorOffers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Offers_AgeOfferId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Offers_AmountOfferId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Offers_MovieGenreOfferId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_AgeOfferId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_AmountOfferId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "AgeOfferId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "AmountOfferId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "MovieGenreOfferId",
                table: "Orders",
                newName: "OfferId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_MovieGenreOfferId",
                table: "Orders",
                newName: "IX_Orders_OfferId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Offers_OfferId",
                table: "Orders",
                column: "OfferId",
                principalTable: "Offers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Offers_OfferId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "OfferId",
                table: "Orders",
                newName: "MovieGenreOfferId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_OfferId",
                table: "Orders",
                newName: "IX_Orders_MovieGenreOfferId");

            migrationBuilder.AddColumn<short>(
                name: "AgeOfferId",
                table: "Orders",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<short>(
                name: "AmountOfferId",
                table: "Orders",
                type: "smallint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AgeOfferId",
                table: "Orders",
                column: "AgeOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_AmountOfferId",
                table: "Orders",
                column: "AmountOfferId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Offers_AgeOfferId",
                table: "Orders",
                column: "AgeOfferId",
                principalTable: "Offers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Offers_AmountOfferId",
                table: "Orders",
                column: "AmountOfferId",
                principalTable: "Offers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Offers_MovieGenreOfferId",
                table: "Orders",
                column: "MovieGenreOfferId",
                principalTable: "Offers",
                principalColumn: "Id");
        }
    }
}
