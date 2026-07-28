namespace ControleDePonto.DTOs.Responses {
    public class LoginResponseDto {

        public bool Status { get; set; } = false;
        public string Menssagem { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;

    }
}
