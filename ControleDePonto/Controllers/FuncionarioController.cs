using Microsoft.AspNetCore.Mvc;
using ControleDePonto.Models;
using ControleDePonto.DTOs.Requests;
using ControleDePonto.Services;

namespace ControleDePonto.Controllers {



    [ApiController]
    [Route("api/[controller]")]
    public class FuncionarioController : ControllerBase {

        public readonly FuncionarioService _funcionarioService;

        public FuncionarioController(FuncionarioService funcionarioService) {

            _funcionarioService = funcionarioService;

        }

        // /api/Funcionario/cadastrar

        [HttpPost("cadastrar")]
        public IActionResult? CadastrarFuncionario(CriarFuncionarioDto dto) {

            var employee = _funcionarioService.CriarFuncionario(dto);

            return Ok();

        }
        


    }
}
