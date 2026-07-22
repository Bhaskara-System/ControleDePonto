using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleDePonto.Migrations
{
    /// <inheritdoc />
    public partial class AlterandoNomeDaColunaDataNascimento : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataDeNacimento",
                table: "Funcionarios");

            migrationBuilder.AlterColumn<string>(
                name: "Telefone",
                table: "Funcionarios",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DataDeNascimento",
                table: "Funcionarios",
                type: "date",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataDeNascimento",
                table: "Funcionarios");

            migrationBuilder.AlterColumn<int>(
                name: "Telefone",
                table: "Funcionarios",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DataDeNacimento",
                table: "Funcionarios",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));
        }
    }
}
