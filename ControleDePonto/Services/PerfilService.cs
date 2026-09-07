using AutoMapper;
using ControleDePonto.DTOs.Responses;
using ControleDePonto.Repositories;

namespace ControleDePonto.Services {
    public class PerfilService {


        private readonly UsuarioRepository _usuarioRepository;
        private readonly IMapper _mapper;

        public PerfilService(UsuarioRepository usuarioRepository, IMapper mapper) {
            _usuarioRepository = usuarioRepository;
            _mapper = mapper;
        }

        public PerfilDto? ObterPerfil(int usuarioId) {

            var usuario = _usuarioRepository.BuscarPorIdComFuncionario(usuarioId);

            if (usuario == null || usuario.Funcionario == null)
                return null;

            return _mapper.Map<PerfilDto>(usuario);

        }
    }
}
