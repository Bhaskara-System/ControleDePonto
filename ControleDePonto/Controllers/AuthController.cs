using ControleDePonto.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using ControleDePonto.Data;
using ControleDePonto.Services;

namespace ControleDePonto.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {

        private readonly UsuarioService _usuarioService;

        public AuthController(UsuarioService usuarioService) {

            _usuarioService = usuarioService;

        }


        [HttpPost("login")]
        public IActionResult? Login(Usuario usuario) {


            var usuarios = _usuarioService.ExibirUsuarios();

            var user = usuarios.FirstOrDefault(p => p.Email == usuario.Email);


            if (user == null) {

                return null;

            }

            if (user.Senha != usuario.Senha) {

                return null;

            }

            return Ok(user);

        }


        [HttpPost("register")]
        public IActionResult? CriarUsuario(Usuario usuario) {


            var user = _usuarioService.CriarUsuario(usuario);


            return Created("", user);

        }


    }
}
