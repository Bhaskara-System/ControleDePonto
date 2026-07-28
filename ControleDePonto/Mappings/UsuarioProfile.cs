using AutoMapper;
using ControleDePonto.DTOs.Requests;
using ControleDePonto.Models;

namespace ControleDePonto.Mappings {
    public class UsuarioProfile: Profile {
        public UsuarioProfile() {

            CreateMap<CriarUsuarioDto, Usuario>();

        }



    }
}
