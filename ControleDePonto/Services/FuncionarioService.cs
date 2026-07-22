
using ControleDePonto.Models;
using ControleDePonto.Repositories;
using ControleDePonto.DTOs.Requests;
using AutoMapper;

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

            var funcinario = _mapper.Map<Funcionario>(dto);

            var userioExiste = _funcionarioRepository.ExibirFuncionario(funcinario);

            if (userioExiste != null) {

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

        public Funcionario? ExibirFuncionario(Funcionario usuario) {


            var user = _funcionarioRepository.ExibirFuncionario(usuario);

            if (user == null) {

                return null;

            }

            return user;

        }




    }
}
