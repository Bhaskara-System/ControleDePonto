using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ControleDePonto.Migrations
{
    /// <inheritdoc />
    public partial class AlteradoColunasEAddTabelUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Perfil",
                table: "Funcionarios");

            migrationBuilder.RenameColumn(
                name: "Senha",
                table: "Funcionarios",
                newName: "Cpf");

            migrationBuilder.AddColumn<DateOnly>(
                name: "DataDeNacimento",
                table: "Funcionarios",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "Matricula",
                table: "Funcionarios",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Telefone",
                table: "Funcionarios",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Nome = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Senha = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropColumn(
                name: "DataDeNacimento",
                table: "Funcionarios");

            migrationBuilder.DropColumn(
                name: "Matricula",
                table: "Funcionarios");

            migrationBuilder.DropColumn(
                name: "Telefone",
                table: "Funcionarios");

            migrationBuilder.RenameColumn(
                name: "Cpf",
                table: "Funcionarios",
                newName: "Senha");

            migrationBuilder.AddColumn<string>(
                name: "Perfil",
                table: "Funcionarios",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
