using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EmpresaApi.Migrations
{
    /// <summary>
    /// Migração inicial (InitialCreate)
    /// Responsável por criar as tabelas Departamentos e Funcionarios no banco SQLite.
    /// </summary>
    public partial class InitialCreate : Migration
    {
        /// <summary>
        /// Método executado quando a migração é aplicada (método "Up").
        /// Define a criação das tabelas e suas relações.
        /// </summary>
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Cria a tabela "Departamentos"
            migrationBuilder.CreateTable(
                name: "Departamentos",
                // Cria as colunas
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Sigla = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departamentos", x => x.Id);
                });
            // Cria a tabela "Funcionarios"
            migrationBuilder.CreateTable(
                name: "Funcionarios",
                // Cria as colunas
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    Foto = table.Column<string>(type: "TEXT", nullable: true),
                    RG = table.Column<string>(type: "TEXT", nullable: false),
                    DepartamentoId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Funcionarios", x => x.Id);
                    // Define a relação 1:N (Departamento → Funcionários)
                    table.ForeignKey(
                        name: "FK_Funcionarios_Departamentos_DepartamentoId",
                        column: x => x.DepartamentoId,
                        principalTable: "Departamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
            // Cria índice para otimizar buscas por DepartamentoId
            migrationBuilder.CreateIndex(
                name: "IX_Funcionarios_DepartamentoId",
                table: "Funcionarios",
                column: "DepartamentoId");
        }

        /// <summary>
        /// Método executado se a migração for revertida (método "Down").
        /// Remove as tabelas criadas no método Up.
        /// </summary>
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove a tabela "Funcionarios" primeiro (por depender de Departamentos)
            migrationBuilder.DropTable(
                name: "Funcionarios");
            // Remove a tabela "Departamentos"
            migrationBuilder.DropTable(
                name: "Departamentos");
        }
    }
}
