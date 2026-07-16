using ControleDePonto.Data;
using ControleDePonto.Models;




namespace ControleDePonto.Repositories {
    public class UsuarioRepository {

        public AppDbContext _appDbContext { get; set; }


        public UsuarioRepository(AppDbContext appDbContext) {

            _appDbContext = appDbContext;

        }




        public List<Usuario>? ExibirUsuarios() {

            var usuarios = _appDbContext.Usuarios.ToList();

            if (usuarios == null) {

                return null;

            }

            return usuarios;
            
        }


        public Usuario CriarUsuario(Usuario usuario) {

            _appDbContext.Usuarios.Add(usuario);
            _appDbContext.SaveChanges();

            return usuario;



        }




    }
}
