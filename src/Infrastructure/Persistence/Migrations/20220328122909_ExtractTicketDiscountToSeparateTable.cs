using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class ExtractTicketDiscountToSeparateTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountDescription",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DiscountName",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "DiscountValue",
                table: "Tickets");

            migrationBuilder.AddColumn<byte>(
                name: "TicketDiscountId",
                table: "Tickets",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.CreateTable(
                name: "TicketDiscount",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DiscountValue = table.Column<decimal>(type: "decimal(3,2)", precision: 3, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TicketDiscount", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_TicketDiscountId",
                table: "Tickets",
                column: "TicketDiscountId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_TicketDiscount_TicketDiscountId",
                table: "Tickets",
                column: "TicketDiscountId",
                principalTable: "TicketDiscount",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_TicketDiscount_TicketDiscountId",
                table: "Tickets");

            migrationBuilder.DropTable(
                name: "TicketDiscount");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_TicketDiscountId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "TicketDiscountId",
                table: "Tickets");

            migrationBuilder.AddColumn<string>(
                name: "DiscountDescription",
                table: "Tickets",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DiscountName",
                table: "Tickets",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "DiscountValue",
                table: "Tickets",
                type: "decimal(3,2)",
                precision: 3,
                scale: 2,
                nullable: false,
                defaultValue: 0m);
        }
    }
}
