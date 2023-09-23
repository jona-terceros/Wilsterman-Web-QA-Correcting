using Microsoft.EntityFrameworkCore.Migrations;

namespace Wilsterman.Migrations
{
    public partial class AnotherMigration10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "playerName",
                table: "TransferRumors",
                newName: "PlayerName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlayerName",
                table: "TransferRumors",
                newName: "playerName");
        }
    }
}
