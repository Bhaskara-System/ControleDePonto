
using ControleDePonto.Data;
using ControleDePonto.Models;

namespace ControleDePonto.Repositories {
    public class UsuarioRepository {


        public AppDbContext _appDbContext;


        public UsuarioRepository(AppDbContext appDbContext) {

            _appDbContext = appDbContext;
        }


        public Usuario? BuscarPorEmail(Usuario usuario) {

            var user = _appDbContext.Usuarios.FirstOrDefault(p => p.Email == usuario.Email);


            return user;

        }


    }
}
