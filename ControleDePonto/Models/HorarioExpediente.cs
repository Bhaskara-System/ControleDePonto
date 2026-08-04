using System;
using System.ComponentModel.DataAnnotations.Schema; // Adicionado para a propriedade ForeignKey

namespace ControleDePonto.Models
{
    /// <summary>
    /// Representa um horário de expediente e centraliza regras de jornada de trabalho.
    /// </summary>
    public class HorarioExpediente
    {
        /// <summary>
        /// Identificador único do registro no banco de dados.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nome descritivo do horário (Ex: "Expediente Comercial").
        /// </summary>
        public string Nome { get; set; } = "Expediente 08h";

        /// <summary>
        /// Momento em que o funcionário deve iniciar o trabalho.
        /// </summary>
        public TimeSpan HoraEntrada { get; set; }

        /// <summary>
        /// Momento em que o funcionário deve encerrar o trabalho.
        /// </summary>
        public TimeSpan HoraSaida { get; set; }

        /// <summary>
        /// Indica se este horário de expediente está ativo no sistema.
        /// </summary>
        public bool Ativo { get; set; } = true;

        /// <summary>
        /// Nome do turno associado (Ex: "Manhã", "Tarde", "Noite").
        /// </summary>
        public string Turno { get; set; } = "Manhã";

        /// <summary>
        /// Quantidade de horas estipuladas para o dia de trabalho (padrão de 8 horas).
        /// </summary>
        public int CargaHorariaDiaria { get; set; } = 8;


        /// <summary> 
        /// Chave estrangeira para o Funcionário associado a este expediente. 
        /// </summary> 
        public int FuncionarioId { get; set; }

        /// <summary> 
        /// Propriedade de navegação do EF Core para carregar os dados do Funcionário. 
        /// </summary> 
        [ForeignKey("FuncionarioId")]
        public Funcionario Funcionario { get; set; } = null!;
        

        /// <summary>
        /// Retorna um texto formatado combinando o nome do expediente e o intervalo de horas.
        /// Exemplo: "Expediente 08h - 08:00 às 17:00"
        /// </summary>
        public string Descricao => $"{Nome} - {HoraEntrada:hh\\:mm} às {HoraSaida:hh\\:mm}";

        /// <summary>
        /// Converte o número inteiro da CargaHorariaDiaria em um objeto TimeSpan.
        /// </summary>
        public TimeSpan CargaHoraria => TimeSpan.FromHours(CargaHorariaDiaria);
        
        // ==========================================
        // Métodos de Regra de Negócio
        // ==========================================

        /// <summary>
        /// Verifica se a jornada de trabalho começa no período noturno.
        /// Considera noturno se a entrada for a partir das 22:00 ou antes das 06:00.
        /// </summary>
        /// <returns>True se for horário noturno, caso contrário False.</returns>
        public bool IsHorarioNoturno()
        {
            // O C# usa 'Hours' no plural para extrair a hora de um TimeSpan
            return HoraEntrada.Hours >= 22 || HoraEntrada.Hours < 6;
        }
    }
}
