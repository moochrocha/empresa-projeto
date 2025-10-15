// Gerado automaticamente pelo EF Core
// Representa o estado atual do modelo de dados
using EmpresaApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EmpresaApi.Migrations
{
    /// <summary>
    /// Snapshot do modelo atual do banco de dados.
    /// Usado pelo EF Core para detectar mudanças de estrutura e gerar novas migrações.
    /// </summary>
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        /// <summary>
        /// Método que descreve o modelo atual das entidades no banco de dados.
        /// Ele é usado internamente pelo EF Core para rastrear alterações de schema.
        /// </summary>
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            // Versão do EF Core usada para gerar essa migração
            modelBuilder.HasAnnotation("ProductVersion", "9.0.9");
            // ENTIDADE: Departamento
            modelBuilder.Entity("EmpresaApi.Models.Departamento", b =>
                {
                    // Define as propriedades (colunas)
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Sigla")
                        .IsRequired()
                        .HasColumnType("TEXT");
                    // Define a chave primária
                    b.HasKey("Id");

                    b.ToTable("Departamentos");
                });
            // ENTIDADE: Funcionario
            modelBuilder.Entity("EmpresaApi.Models.Funcionario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("DepartamentoId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Foto")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("RG")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");
                    // Cria índice de pesquisa pela FK
                    b.HasIndex("DepartamentoId");

                    b.ToTable("Funcionarios");
                });
            // RELACIONAMENTO: Departamento 1:N Funcionarios
            modelBuilder.Entity("EmpresaApi.Models.Funcionario", b =>
                {
                    b.HasOne("EmpresaApi.Models.Departamento", "Departamento")
                        .WithMany("Funcionarios")
                        .HasForeignKey("DepartamentoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                    // Propriedade de navegação
                    b.Navigation("Departamento");
                });

            modelBuilder.Entity("EmpresaApi.Models.Departamento", b =>
                {
                    b.Navigation("Funcionarios");
                });
#pragma warning restore 612, 618
        }
    }
}
