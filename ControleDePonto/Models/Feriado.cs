using System;

namespace ControleDePonto.Models
{
    /// <summary>
    /// Representa um feriado ou ponto facultativo no sistema de controle de ponto.
    /// </summary>
    public class Feriado
    {
        /// <summary>
        /// Identificador único do feriado no banco de dados.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Data em que o feriado ocorre (Dia/Mês/Ano).
        /// </summary>
        public DateTime Data { get; set; }

        /// <summary>
        /// Nome descritivo do feriado (Ex: "Independência do Brasil", "Ano Novo").
        /// </summary>
        public string Nome { get; set; } = "";

        /// <summary>
        /// Abrangência do feriado. Exemplos válidos: "Nacional", "Estadual", "Municipal".
        /// </summary>
        public string Tipo { get; set; } = "Nacional";

        /// <summary>
        /// Indica se o dia é um ponto facultativo (onde a dispensa do trabalho é opcional).
        /// </summary>
        public bool PontoFacultativo { get; set; } = false;

        /// <summary>
        /// Indica se as horas deste dia serão abonadas (pagas normalmente sem gerar desconto ao colaborador).
        /// </summary>
        public bool Abonado { get; set; } = true;
    }
}
