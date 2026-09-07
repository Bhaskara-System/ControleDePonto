using ControleDePonto.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ControleDePonto.Controllers {
    
    //[Authorize]
    [ApiController]
    [Route("api/[Controller]")]
    public class PerfilController : ControllerBase {


        private readonly PerfilService _perfilService;

        public PerfilController(PerfilService perfilService) {

            _perfilService = perfilService;
        }

        [HttpGet]
        public IActionResult ObterMeuPerfil() {

            var usuarioIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(usuarioIdClaim) || !int.TryParse(usuarioIdClaim, out int usuarioId)) {

                return Unauthorized(new {messagem = "Usuario não autenticado ou token inválido." });
            }

            var perfilDto = _perfilService.ObterPerfil(usuarioId);

            if (perfilDto == null) {

                return NotFound(new { menssagem = "Perfil não encontrado" });

            }

            return Ok(perfilDto);
        }



    }
}
