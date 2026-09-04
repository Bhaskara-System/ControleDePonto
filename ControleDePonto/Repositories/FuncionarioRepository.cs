using ControleDePonto.Data;
using ControleDePonto.Models;




namespace ControleDePonto.Repositories {
    public class FuncionarioRepository {

        private AppDbContext _appDbContext { get; set; }


        public FuncionarioRepository(AppDbContext appDbContext) {

            _appDbContext = appDbContext;

        }




        public List<Funcionario>? ExibirTodosFuncionarios() {

            var funcionarios = _appDbContext.Funcionarios.ToList();

            return funcionarios;
            
        }


        public Funcionario?ConsultarFuncionario(string valor) {

            var funcionario = _appDbContext.Funcionarios.FirstOrDefault(p => p.Cpf == valor);

            return funcionario;

        }


        public Funcionario CriarFuncionario(Funcionario funcionario) {

            _appDbContext.Funcionarios.Add(funcionario);
            _appDbContext.SaveChanges();

            return funcionario;

        }


        public Funcionario? AtualizarFuncionario(Funcionario funcionarioExistente) {

            _appDbContext.SaveChanges();

            return funcionarioExistente;

        }








    }
}
