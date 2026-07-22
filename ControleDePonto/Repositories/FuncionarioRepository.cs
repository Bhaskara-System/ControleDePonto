using ControleDePonto.Data;
using ControleDePonto.Models;




namespace ControleDePonto.Repositories {
    public class FuncionarioRepository {

        public AppDbContext _appDbContext { get; set; }


        public FuncionarioRepository(AppDbContext appDbContext) {

            _appDbContext = appDbContext;

        }




        public List<Funcionario>? ExibirTodosFuncionarios() {

            var funcionarios = _appDbContext.Funcionarios.ToList();

            return funcionarios;
            
        }


        public Funcionario? ExibirFuncionario(Funcionario funcionario) {

            var emploeyee = _appDbContext.Funcionarios.FirstOrDefault(p => p.Email == funcionario.Email);

            return emploeyee;

        }


        public Funcionario CriarFuncionario(Funcionario funcionario) {

            _appDbContext.Funcionarios.Add(funcionario);
            _appDbContext.SaveChanges();

            return funcionario;

        }





    }
}
