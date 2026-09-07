namespace ControleDePonto.Models {
    public class Usuario {

        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; }  = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Perfil { get; set; } = "Funcionario";
        public bool Ativo { get; set; }

        public int FuncionarioId { get; set; }
        public Funcionario Funcionario { get; set; } = null!;



    }
}
