using AutoMapper;
using ControleDePonto.DTOs.Requests;
using ControleDePonto.DTOs.Responses;
using ControleDePonto.Models;

namespace ControleDePonto.Mappings {
    public class FuncionarioProfile : Profile {

        public FuncionarioProfile() {

            CreateMap<CriarFuncionarioDto, Funcionario>();

            CreateMap<AtualizarFuncionarioDto, Funcionario>();

        }

    }
}
