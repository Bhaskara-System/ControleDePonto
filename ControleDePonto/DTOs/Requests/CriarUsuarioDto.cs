using System.ComponentModel.DataAnnotations;

namespace ControleDePonto.DTOs.Requests {
    public class CriarUsuarioDto {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome não pode exceder 100 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "Informe um e-mail válido.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres.")]
        public string Senha { get; set; } = string.Empty;

        // ID do funcionário pré-existente do RH que receberá o acesso
        [Required(ErrorMessage = "É necessário vincular um funcionário ao usuário.")]
        public int FuncionarioId { get; set; }

        // Opcional: Define se o usuário criado será Admin ou Funcionário comum
        public string Perfil { get; set; } = "Funcionario";
    }
}
