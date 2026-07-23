using System; //Utilizado para usar DateTime, TimeSpan, Guid, entre outros
using System.Collections.Generic; //Utilizado para usar List, Dictionary, entre outros
using System.Linq; //Utilizado para usar LINQ

namespace ControleDePonto.Services 
{
    /// Classe responsável por validar todas as regras do ponto eletrônico
    /// Esta classe é independente de banco de dados
    
    public class PontoRegrasService
    {
    // CONFIGURAÇÕES DO SISTEMA (Constantes)
    // Horário comercial
    private const int HORA_ENTRADA = 9;        // 9:00 da manhã
    private const int MINUTO_ENTRADA = 0;      // 0 minutos (9h em ponto)
    
    private const int HORA_SAIDA = 18;         // 18:00 (6 da tarde)
    private const int MINUTO_SAIDA = 0;        // 0 minutos (18h em ponto)
     
    }
}
