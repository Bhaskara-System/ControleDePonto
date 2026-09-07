using AutoMapper;
using ControleDePonto.DTOs.Responses;
using ControleDePonto.Models;

namespace ControleDePonto.Mappings {
    public class PerfilProfile : Profile {
        public PerfilProfile() {
            CreateMap<Usuario, PerfilDto>()
                .ForMember(dest => dest.Cpf, opt => opt.MapFrom(src =>
                    src.Funcionario != null ? src.Funcionario.Cpf : string.Empty))

                .ForMember(dest => dest.Matricula, opt => opt.MapFrom(src =>
                    src.Funcionario != null ? src.Funcionario.Matricula : 0))

                // Prioriza o Nome do Funcionario; se nulo, pega o Nome da conta de Usuário
                .ForMember(dest => dest.Nome, opt => opt.MapFrom(src =>
                    src.Funcionario != null && !string.IsNullOrEmpty(src.Funcionario.Nome)
                        ? src.Funcionario.Nome
                        : src.Nome))

                // Prioriza o Email do Funcionario; se nulo, usa o Email do Usuário
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src =>
                    src.Funcionario != null && !string.IsNullOrEmpty(src.Funcionario.Email)
                        ? src.Funcionario.Email
                        : src.Email))

                .ForMember(dest => dest.Telefone, opt => opt.MapFrom(src =>
                    src.Funcionario != null ? (src.Funcionario.Telefone ?? string.Empty) : string.Empty))

                // Formatação da data DateOnly? para "yyyy-MM-dd"
                .ForMember(dest => dest.DataDeNascimento, opt => opt.MapFrom(src =>
                    (src.Funcionario != null && src.Funcionario.DataDeNascimento.HasValue)
                        ? src.Funcionario.DataDeNascimento.Value.ToString("yyyy-MM-dd")
                        : string.Empty))

                .ForMember(dest => dest.Hierarquia, opt => opt.MapFrom(src =>
                    src.Funcionario != null ? src.Funcionario.Hierarquia : src.Perfil))

                // Garante o carregamento da Foto ou usa a imagem padrão sem_foto.png
                .ForMember(dest => dest.FotoUrl, opt => opt.MapFrom(src =>
                    (src.Funcionario != null && !string.IsNullOrEmpty(src.Funcionario.FotoUrl))
                        ? src.Funcionario.FotoUrl
                        : "/ft_perfil/sem_foto.png"));
        }
    }
}