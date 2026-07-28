using ControleDePonto.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using ControleDePonto.Data;
using ControleDePonto.Services;
using ControleDePonto.DTOs.Requests;

namespace ControleDePonto.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {

        private readonly UsuarioService _usuarioService;

        public AuthController(UsuarioService usuarioService) {

            _usuarioService = usuarioService;

        }

        [HttpPost("login")]
        public IActionResult? Login(LoginDto dto) {

            var resultado = _usuarioService.Login(dto);

            if (!resultado.Status) {

                return Unauthorized(

                    new { resultado.Menssagem});

            }

            return Ok(new {

                menssagem = resultado.Menssagem,
                token = resultado.Token

            });

        }

        [HttpPost("register")]
        public IActionResult? CriarUsuario(CriarUsuarioDto dto) {

            var usuario = _usuarioService.CriarUsuario(dto);

            return Created("", usuario);
        }



    }
}
