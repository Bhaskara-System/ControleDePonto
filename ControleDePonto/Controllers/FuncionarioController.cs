using ControleDePonto.DTOs.Requests;
using ControleDePonto.DTOs.Responses;
using ControleDePonto.Models;
using ControleDePonto.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ControleDePonto.Controllers {



    [ApiController]
    [Route("api/[controller]")]
    public class FuncionarioController : ControllerBase {

        public readonly FuncionarioService _funcionarioService;

        public FuncionarioController(FuncionarioService funcionarioService) {


            _funcionarioService = funcionarioService;

        }


        [HttpGet("pesquisar")]
        public IActionResult? ConsultaFuncionario([FromQuery] string valor) {

            var funcionario = _funcionarioService.ConsultaFuncionario(valor);

            return Ok(funcionario);

        }


        [Authorize(Roles = "Admin")]
        [HttpPost("cadastrar")]
        public IActionResult? CadastrarFuncionario(CriarFuncionarioDto dto) {

            var employee = _funcionarioService.CriarFuncionario(dto);

            return Ok();

        }


        [HttpPut("{id}")]
        public IActionResult? AtualizarFuncionario(int id, AtualizarFuncionarioDto funcionarioAtualizado) {

            var funcionario = _funcionarioService.AtualizarFuncionario(id, funcionarioAtualizado);

            return Ok(funcionario);
            

        }
        


    }
}
