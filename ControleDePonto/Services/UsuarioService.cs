
using ControleDePonto.Repositories;
using ControleDePonto.Models;
using ControleDePonto.Service;
using ControleDePonto.DTOs.Responses;
using ControleDePonto.DTOs.Requests;
using AutoMapper;
using Microsoft.AspNetCore.Identity; // Essa Blibioteca é necessaria para usar o PasswordHasher

namespace ControleDePonto.Services {
    public class UsuarioService {

        private readonly UsuarioRepository _usuarioRepository;
        private readonly JwtService _jwtService;
        // public IMapper _mapper;
        private readonly new PasswordHasher<Usuario> _passWordHasher;

        public UsuarioService(UsuarioRepository usuarioService, JwtService jwtService) {

            _usuarioRepository = usuarioService;
            _jwtService = jwtService;
            _passWordHasher = new PasswordHasher<Usuario>();
        }


    public LoginResponseDto? Login(LoginDto dto) {


            if (string.IsNullOrWhiteSpace(dto.Email)) {
                return null;
            }

            if (string.IsNullOrWhiteSpace(dto.Senha)) {
                return null;
            }


            var usuario = _usuarioRepository.BuscarPorEmail(dto.Email);
            
            if (usuario == null) {

                return null;

            }


            var resultado = _passWordHasher.VerifyHashedPassword(

                usuario,
                usuario.Senha,
                dto.Senha

                );

            if (resultado != PasswordVerificationResult.Success) {

                var retornoRequisicao = new LoginResponseDto {

                    Status = false,
                    Menssagem = "Usuario ou Senha Invalidos"

                };

                return retornoRequisicao;
            }

            var token = _jwtService.GerarToken(usuario);

            var resposta = new LoginResponseDto {
                Status = true,
                Menssagem = "Login Efetuado com Sucesso",
                Token = token };

            return resposta;

        }

        
        public Usuario? CriarUsuario(CriarUsuarioDto dto) {

            // var usuario = _mapper.Map<Usuario> (dto);

            var usuarioExiste = _usuarioRepository.BuscarPorEmail(dto.Email);

            var usuario = new Usuario {

                Nome = dto.Nome,
                Email = dto.Email,
                Perfil = "Cliente"

            };

            usuario.Senha = _passWordHasher.HashPassword(usuario, dto.Senha);

            if (usuarioExiste != null) {

                return null;
            }

            if (string.IsNullOrWhiteSpace(usuario.Email)) {
                return null;
            }

            if (string.IsNullOrWhiteSpace(usuario.Nome)) {
                return null;
            }

            if (string.IsNullOrWhiteSpace(usuario.Nome)) {
                return null;
            }

            return _usuarioRepository.CriarUsuario(usuario); ;

        }



    }
}
