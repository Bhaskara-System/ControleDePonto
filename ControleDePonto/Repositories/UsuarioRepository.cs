
using ControleDePonto.Data;
using ControleDePonto.Models;

namespace ControleDePonto.Repositories {
    public class UsuarioRepository {


        private readonly AppDbContext _appDbContext;


        public UsuarioRepository(AppDbContext appDbContext) {

            _appDbContext = appDbContext;
        }


        public Usuario? BuscarPorEmail(string email) {

            var user = _appDbContext.Usuarios.FirstOrDefault(p => p.Email == email);


            return user;

        }

        public Usuario? CriarUsuario(Usuario usuario) {

            _appDbContext.Usuarios.Add(usuario);
            _appDbContext.SaveChanges();

            return usuario;

        }


    }
}
