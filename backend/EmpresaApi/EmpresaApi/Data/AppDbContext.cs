// ---------------------------------------------------------
// Arquivo: AppDbContext.cs
// Camada: Data
// Descrição: Define o contexto do banco de dados da aplicação, usando Entity Framework Core e SQLite.
// ---------------------------------------------------------
using Microsoft.EntityFrameworkCore;
using EmpresaApi.Models;

namespace EmpresaApi.Data
{
    // Classe responsável por representar o contexto do banco de dados da aplicação.
    // O Entity Framework Core (EF Core) utiliza esta classe para mapear as entidades
    // (como Departamento e Funcionario) para as tabelas do banco.
    public class AppDbContext : DbContext
    {
        // Construtor que recebe as opções de configuração do contexto.
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Representa a tabela "Departamentos" no banco de dados.
        public DbSet<Departamento> Departamentos { get; set; }

        // Representa a tabela "Funcionarios" no banco de dados.
        public DbSet<Funcionario> Funcionarios { get; set; }
    }
}