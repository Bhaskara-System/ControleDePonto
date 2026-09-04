
using ControleDePonto.Models;
using ControleDePonto.Repositories;
using ControleDePonto.DTOs.Requests;
using AutoMapper;
using ControleDePonto.DTOs.Responses;

namespace ControleDePonto.Services {
    public class FuncionarioService {

        private readonly FuncionarioRepository _funcionarioRepository;

        private readonly IMapper _mapper;


        public FuncionarioService(FuncionarioRepository usuarioRepository, IMapper mapper) {

            _funcionarioRepository = usuarioRepository;
            _mapper = mapper;

        }



        public List<Funcionario>? ExibirTodosUsuarios() {

            var usuarios = _funcionarioRepository.ExibirTodosFuncionarios();

            return usuarios;

        }


        public Funcionario? CriarFuncionario(CriarFuncionarioDto dto) {

            // Aqui ele converte os dados de dto para o funcionario
            var funcinario = _mapper.Map<Funcionario>(dto);

            var funcinarioExiste = _funcionarioRepository.ConsultarFuncionario(funcinario.Cpf);

            if (funcinarioExiste != null) {

                return null;
            }

            if (string.IsNullOrWhiteSpace(funcinario.Nome)) {
                return null;
            }

            if (string.IsNullOrWhiteSpace(funcinario.Email)) {
                return null;
            }

            var user = _funcionarioRepository.CriarFuncionario(funcinario);

            return user;

        }

        public Funcionario? ConsultaFuncionario(string valor) {


            var funcionario = _funcionarioRepository.ConsultarFuncionario(valor);

            if (funcionario == null) {

                return null;

            }

            return funcionario;

        }


        public Funcionario? AtualizarFuncionario(int id, AtualizarFuncionarioDto dto) {

            var funcionarioExistente = _funcionarioRepository.ConsultarFuncionario(dto.Cpf);

            if (funcionarioExistente == null) {

                return null;
            }

            _mapper.Map(dto, funcionarioExistente);


            return _funcionarioRepository.AtualizarFuncionario(funcionarioExistente); ;

        }




    }
}
