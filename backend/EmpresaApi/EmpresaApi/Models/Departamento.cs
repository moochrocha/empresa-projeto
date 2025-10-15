// ---------------------------------------------------------
// Arquivo: Departamento.cs
// Camada: Models
// Descrição: Representa a entidade Departamento do sistema.
// ---------------------------------------------------------
namespace EmpresaApi.Models
{
    /// <summary>
    /// Classe que representa um departamento dentro da empresa.
    /// Cada departamento possui um nome, uma sigla e pode ter
    /// vários funcionários associados.
    /// </summary>
    public class Departamento
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sigla { get; set; }
        /// <summary>
        /// Relação 1:N entre Departamento e Funcionário.
        /// Um departamento pode conter vários funcionários.
        /// Essa propriedade é usada pelo Entity Framework para gerar o relacionamento entre tabelas.
        /// </summary>
        public ICollection<Funcionario>? Funcionarios { get; set; }
    }
}
