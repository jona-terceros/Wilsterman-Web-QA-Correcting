using Microsoft.EntityFrameworkCore.Migrations;

namespace Wilsterman.Migrations
{
    public partial class OtherMigration10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "playerName",
                table: "TransferRumors",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "playerName",
                table: "TransferRumors");
        }
    }
}
