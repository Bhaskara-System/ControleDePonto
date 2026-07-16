
using ControleDePonto.Models;
using ControleDePonto.Repositories;

namespace ControleDePonto.Services {
    public class UsuarioService {

        private readonly UsuarioRepository _usuarioRepository;


        public UsuarioService(UsuarioRepository usuarioRepository) {

            _usuarioRepository = usuarioRepository;

        }


        public List<Usuario>? ExibirUsuarios() {

            var usuarios = _usuarioRepository.ExibirUsuarios();

            return usuarios;

        }


        public Usuario? CriarUsuario(Usuario usuario) {


            var user = _usuarioRepository.CriarUsuario(usuario);



            return user;

        }




    }
}
