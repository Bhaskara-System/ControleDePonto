using ControleDePonto.Models;
using System.Security.Claims; //Essa Blibioteca é necessaria para usar o Claim
using System.Text; // Essa Blibioteca é necessaria para usar o Encoding.UTF8.GetBytes
using Microsoft.IdentityModel.Tokens; // Essa bliblioteca é necessaria para usar o SymmetricSecurityKey
using System.IdentityModel.Tokens.Jwt; // Essa Blibioteca é necessaria para usar o JwtSecurityToken



namespace ControleDePonto.Service {
    public class JwtService {



        private readonly IConfiguration _configuration;

        public JwtService(IConfiguration configuration) {

            _configuration = configuration;

        }

        public string GerarToken(Usuario usuario) {

            // Pega as informações do usuario para gerar o claim
            var claims = new List<Claim> {

                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),

                new Claim(ClaimTypes.Name, usuario.Nome),

                new Claim(ClaimTypes.Email,usuario.Email),

                new Claim(ClaimTypes.Role, usuario.Perfil)


            };

            var key = _configuration["Jwt:Key"];

            // Converte a chave secreta de texto para bytes,
            // pois o algoritmo de assinatura trabalha com bytes
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(

                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:ExpireHours"])),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
