using ControleDePonto.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;


namespace ControleDePonto.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {

        List<Usuario> usuarios = new List<Usuario> {
            new Usuario {
                Nome = "Cleytoni",
                Email = "cleytoni@gmail.com",
                Senha = "123456" }
        };


        [HttpPost("login")]
        public IActionResult? Login(Usuario usuario) {

            var user = usuarios.FirstOrDefault(p => p.Email == usuario.Email);


            if (user.Senha != usuario.Senha) {

                return null;

            }

            return Ok();

        }


    }
}
