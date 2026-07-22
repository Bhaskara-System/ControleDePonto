using System.ComponentModel.DataAnnotations.Schema;

namespace ControleDePonto.Models {

   public class Funcionario {

        public int Id { get; set; }
        public string Cpf { get; set; } = string.Empty;
        public int Matricula { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; }
        public DateOnly? DataDeNascimento { get; set; }
        public string Hierarquia { get; set; } = string.Empty;
    }
}
