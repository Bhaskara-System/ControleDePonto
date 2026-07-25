
using ControleDePonto.Repositories;
using ControleDePonto.Models;
using ControleDePonto.Service;
using ControleDePonto.DTOs.Responses;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ControleDePonto.Services {
    public class UsuarioService {

        public UsuarioRepository _usuarioRepository;
        public JwtService _jwtService;

        public UsuarioService(UsuarioRepository usuarioService, JwtService jwtService) {

            _usuarioRepository = usuarioService;
            _jwtService = jwtService;

        }


    public LoginResponseDto? Login(Usuario usuario) {


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

            var token = _jwtService.GerarToken(usuario);

            var resposta = new LoginResponseDto { Token = token };

            return resposta;

        }



    }
}
