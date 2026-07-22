
using ControleDePonto.Repositories;
using ControleDePonto.Models;

namespace ControleDePonto.Services {
    public class UsuarioService {

        public UsuarioRepository _usuarioRepository;

        public UsuarioService(UsuarioRepository usuarioService) {

            _usuarioRepository = usuarioService;

        }


    public Usuario? LoginResponseDto(Usuario usuario) {


            if (string.IsNullOrWhiteSpace(usuario.Email)) {
                return null;
            }

            if (string.IsNullOrWhiteSpace(usuario.Senha)) {
                return null;
            }


            var user = _usuarioRepository.BuscarPorEmail(usuario);
            
            if (user == null) {

                return null;

            } 

            return user;

        }



    }
}
