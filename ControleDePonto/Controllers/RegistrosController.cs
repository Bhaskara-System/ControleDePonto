using Microsoft.AspNetCore.Mvc;
using ControleDePonto.Models;

namespace ControleDePonto.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrosController : ControllerBase {

        List<Registros> registros = new List<Registros> {

                new Registros {
                    Id = 1,
                    Data = DateOnly.Parse("07-09-2025"),
                    HoraEntrada = TimeOnly.Parse("08:00"),
                    HoraSaida = TimeOnly.Parse("18:01"),
                    Status = "Completo"
                },
                 new Registros {
                    Id = 2,
                    Data = DateOnly.Parse("07-10-2025"),
                    HoraEntrada = TimeOnly.Parse("08:30"),
                    HoraSaida = TimeOnly.Parse("18:00"),
                    Status = "Completo"
                },

                 new Registros {
                    Id = 3,
                    Data = DateOnly.Parse("07-11-2025"),
                    HoraEntrada = TimeOnly.Parse("08:10"),
                    HoraSaida = TimeOnly.Parse("18:21"),
                    Status = "Completo"
                }
            };

        [HttpGet]
        public IActionResult ConsultaRegistros() {

            return Ok(registros);
        }



    }
}
