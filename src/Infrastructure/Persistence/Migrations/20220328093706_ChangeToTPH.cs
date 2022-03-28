using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class ChangeToTPH : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieGenre_Genre_GenreId",
                table: "MovieGenre");

            migrationBuilder.DropForeignKey(
                name: "FK_MovieGenreOffers_Genre_GenreId",
                table: "MovieGenreOffers");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_AgeOffers_AgeOfferId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_AmountOffers_AmountOfferId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Order_MovieGenreOffers_MovieGenreOfferId",
                table: "Order");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Order_OrderId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "AgeOffers");

            migrationBuilder.DropTable(
                name: "AmountOffers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Order",
                table: "Order");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Genre",
                table: "Genre");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovieGenreOffers",
                table: "MovieGenreOffers");

            migrationBuilder.DropIndex(
                name: "IX_MovieGenreOffers_GenreId",
                table: "MovieGenreOffers");

            migrationBuilder.RenameTable(
                name: "Order",
                newName: "Orders");

            migrationBuilder.RenameTable(
                name: "Genre",
                newName: "Genres");

            migrationBuilder.RenameTable(
                name: "MovieGenreOffers",
                newName: "Offers");

            migrationBuilder.RenameIndex(
                name: "IX_Order_MovieGenreOfferId",
                table: "Orders",
                newName: "IX_Orders_MovieGenreOfferId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_AmountOfferId",
                table: "Orders",
                newName: "IX_Orders_AmountOfferId");

            migrationBuilder.RenameIndex(
                name: "IX_Order_AgeOfferId",
                table: "Orders",
                newName: "IX_Orders_AgeOfferId");

            migrationBuilder.AlterColumn<byte>(
                name: "GenreId",
                table: "Offers",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AddColumn<byte>(
                name: "AgeConstraintId",
                table: "Offers",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "DiscountedNumberOfTickets",
                table: "Offers",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Offers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<byte>(
                name: "RequiredNumberOfTickets",
                table: "Offers",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ValidFrom",
                table: "Offers",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ValidTo",
                table: "Offers",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Orders",
                table: "Orders",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Genres",
                table: "Genres",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Offers",
                table: "Offers",
                column: "Id");

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

            migrationBuilder.AddForeignKey(
                name: "FK_MovieGenre_Genres_GenreId",
                table: "MovieGenre",
                column: "GenreId",
                principalTable: "Genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_AgeConstraints_AgeConstraintId",
                table: "Offers",
                column: "AgeConstraintId",
                principalTable: "AgeConstraints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Genres_GenreId",
                table: "Offers",
                column: "GenreId",
                principalTable: "Genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Orders_OrderId",
                table: "Tickets",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MovieGenre_Genres_GenreId",
                table: "MovieGenre");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_AgeConstraints_AgeConstraintId",
                table: "Offers");

            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Genres_GenreId",
                table: "Offers");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Offers_AgeOfferId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Offers_AmountOfferId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Offers_MovieGenreOfferId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Orders_OrderId",
                table: "Tickets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Orders",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Genres",
                table: "Genres");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Offers",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Offers_AgeConstraintId",
                table: "Offers");

            migrationBuilder.DropIndex(
                name: "IX_Offers_GenreId",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "AgeConstraintId",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "DiscountedNumberOfTickets",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "RequiredNumberOfTickets",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "ValidFrom",
                table: "Offers");

            migrationBuilder.DropColumn(
                name: "ValidTo",
                table: "Offers");

            migrationBuilder.RenameTable(
                name: "Orders",
                newName: "Order");

            migrationBuilder.RenameTable(
                name: "Genres",
                newName: "Genre");

            migrationBuilder.RenameTable(
                name: "Offers",
                newName: "MovieGenreOffers");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_MovieGenreOfferId",
                table: "Order",
                newName: "IX_Order_MovieGenreOfferId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_AmountOfferId",
                table: "Order",
                newName: "IX_Order_AmountOfferId");

            migrationBuilder.RenameIndex(
                name: "IX_Orders_AgeOfferId",
                table: "Order",
                newName: "IX_Order_AgeOfferId");

            migrationBuilder.AlterColumn<byte>(
                name: "GenreId",
                table: "MovieGenreOffers",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Order",
                table: "Order",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Genre",
                table: "Genre",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovieGenreOffers",
                table: "MovieGenreOffers",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AgeOffers",
                columns: table => new
                {
                    Id = table.Column<short>(type: "smallint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AgeConstraintId = table.Column<byte>(type: "tinyint", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    DiscountValue = table.Column<decimal>(type: "decimal(3,2)", precision: 3, scale: 2, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgeOffers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgeOffers_AgeConstraints_AgeConstraintId",
                        column: x => x.AgeConstraintId,
                        principalTable: "AgeConstraints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AmountOffers",
                columns: table => new
                {
                    Id = table.Column<short>(type: "smallint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    DiscountValue = table.Column<decimal>(type: "decimal(3,2)", precision: 3, scale: 2, nullable: false),
                    DiscountedNumberOfTickets = table.Column<byte>(type: "tinyint", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    RequiredNumberOfTickets = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AmountOffers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MovieGenreOffers_GenreId",
                table: "MovieGenreOffers",
                column: "GenreId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AgeOffers_AgeConstraintId",
                table: "AgeOffers",
                column: "AgeConstraintId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieGenre_Genre_GenreId",
                table: "MovieGenre",
                column: "GenreId",
                principalTable: "Genre",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovieGenreOffers_Genre_GenreId",
                table: "MovieGenreOffers",
                column: "GenreId",
                principalTable: "Genre",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_AgeOffers_AgeOfferId",
                table: "Order",
                column: "AgeOfferId",
                principalTable: "AgeOffers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_AmountOffers_AmountOfferId",
                table: "Order",
                column: "AmountOfferId",
                principalTable: "AmountOffers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_MovieGenreOffers_MovieGenreOfferId",
                table: "Order",
                column: "MovieGenreOfferId",
                principalTable: "MovieGenreOffers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Order_OrderId",
                table: "Tickets",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
