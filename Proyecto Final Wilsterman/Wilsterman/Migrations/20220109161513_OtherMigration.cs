using Microsoft.EntityFrameworkCore.Migrations;

namespace Wilsterman.Migrations
{
    public partial class OtherMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Day",
                table: "Game",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DayWeek",
                table: "Game",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Hour",
                table: "Game",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Minutes",
                table: "Game",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Month",
                table: "Game",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Day",
                table: "Game");

            migrationBuilder.DropColumn(
                name: "DayWeek",
                table: "Game");

            migrationBuilder.DropColumn(
                name: "Hour",
                table: "Game");

            migrationBuilder.DropColumn(
                name: "Minutes",
                table: "Game");

            migrationBuilder.DropColumn(
                name: "Month",
                table: "Game");
        }
    }
}
