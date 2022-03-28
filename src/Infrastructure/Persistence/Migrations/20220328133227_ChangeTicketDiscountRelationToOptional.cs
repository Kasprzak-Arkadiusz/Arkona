using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class ChangeTicketDiscountRelationToOptional : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_TicketDiscount_TicketDiscountId",
                table: "Tickets");

            migrationBuilder.AlterColumn<byte>(
                name: "TicketDiscountId",
                table: "Tickets",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_TicketDiscount_TicketDiscountId",
                table: "Tickets",
                column: "TicketDiscountId",
                principalTable: "TicketDiscount",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_TicketDiscount_TicketDiscountId",
                table: "Tickets");

            migrationBuilder.AlterColumn<byte>(
                name: "TicketDiscountId",
                table: "Tickets",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_TicketDiscount_TicketDiscountId",
                table: "Tickets",
                column: "TicketDiscountId",
                principalTable: "TicketDiscount",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
