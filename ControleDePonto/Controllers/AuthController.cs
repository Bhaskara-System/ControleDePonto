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

            var user = _usuarioService.LoginResponseDto(usuario);

            return Ok();

        }


        [HttpPost("register")]
        public IActionResult? CriarUsuario(Usuario usuario) {




            return null;

        }


    }
}
