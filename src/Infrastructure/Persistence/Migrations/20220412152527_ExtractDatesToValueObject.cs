using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    public partial class ExtractDatesToValueObject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_AgeConstraints_AgeConstraintId",
                table: "Movies");

            migrationBuilder.AlterColumn<short>(
                name: "Number",
                table: "Seats",
                type: "smallint",
                nullable: false,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "Movies",
                type: "varbinary(max)",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");

            migrationBuilder.AlterColumn<byte>(
                name: "AgeConstraintId",
                table: "Movies",
                type: "tinyint",
                nullable: true,
                oldClrType: typeof(byte),
                oldType: "tinyint");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_AgeConstraints_AgeConstraintId",
                table: "Movies",
                column: "AgeConstraintId",
                principalTable: "AgeConstraints",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_AgeConstraints_AgeConstraintId",
                table: "Movies");

            migrationBuilder.AlterColumn<byte>(
                name: "Number",
                table: "Seats",
                type: "tinyint",
                nullable: false,
                oldClrType: typeof(short),
                oldType: "smallint");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Image",
                table: "Movies",
                type: "varbinary(max)",
                nullable: false,
                defaultValue: new byte[0],
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<byte>(
                name: "AgeConstraintId",
                table: "Movies",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0,
                oldClrType: typeof(byte),
                oldType: "tinyint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_AgeConstraints_AgeConstraintId",
                table: "Movies",
                column: "AgeConstraintId",
                principalTable: "AgeConstraints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
