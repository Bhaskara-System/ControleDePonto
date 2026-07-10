namespace ControleDePonto.Models {
    public class Registros {

        public int Id { get; set; }
        public DateOnly Data { get; set; }
        public TimeOnly HoraEntrada { get; set; }
        public TimeOnly HoraSaida { get; set; }
        public string Status { get; set; } = string.Empty;


    }
}
