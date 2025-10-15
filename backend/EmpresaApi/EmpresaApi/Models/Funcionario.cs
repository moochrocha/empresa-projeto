// ---------------------------------------------------------
// Arquivo: Funcionario.cs
// Camada: Models
// Descrição: Representa a entidade Funcionário do sistema.
// ---------------------------------------------------------

using System.Text.Json.Serialization;

namespace EmpresaApi.Models
{
    /// <summary>
    /// Classe que representa um funcionário da empresa.
    /// Cada funcionário pertence a um departamento e pode ter uma foto associada.
    /// </summary>
    public class Funcionario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string? Foto { get; set; }
        public string RG { get; set; }
        public int DepartamentoId { get; set; }

        /// <summary>
        /// Propriedade de navegação que referencia o Departamentoao qual o funcionário pertence.
        /// 
        /// O atributo [JsonIgnore] impede que essa propriedade cause loops de serialização (ciclos) ao converter em JSON.
        /// </summary>
        [JsonIgnore]
        public Departamento? Departamento { get; set; }
    }
}
