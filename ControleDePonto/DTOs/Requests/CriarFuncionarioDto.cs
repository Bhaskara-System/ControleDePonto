namespace ControleDePonto.DTOs.Requests {
    public class CriarFuncionarioDto {

        public string Cpf { get; set; } = string.Empty;
        public int Matricula { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; }
        public DateOnly DataDeNacimento { get; set; }
        public string Hierarquia { get; set; } = string.Empty;


    }
}
