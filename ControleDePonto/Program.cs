using ControleDePonto.Data;
using ControleDePonto.Mappings;
using ControleDePonto.Repositories;
using ControleDePonto.Service;
using ControleDePonto.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.IdentityModel.Tokens.Experimental;
using System.Text;

namespace ControleDePonto {
    class Program {
        static void Main(string[] args) {

            var builder = WebApplication.CreateBuilder(args);

            // Dependencias do Swagger
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add services to the container.

            builder.Services.AddControllers();

            // Injeção de denpendencia
            builder.Services.AddScoped<FuncionarioRepository>();
            builder.Services.AddScoped<FuncionarioService>();

            // Injeção de denpendencia
            builder.Services.AddScoped<UsuarioRepository>();
            builder.Services.AddScoped<UsuarioService>();


            builder.Services.AddScoped<JwtService>();


            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();


            // Essa Linha configura o banco de dados
            builder.Services.AddDbContext<AppDbContext>(options => 
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Aqui ele faz a validação do token
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {

                    options.TokenValidationParameters = new TokenValidationParameters {

                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
                    };


                });



            builder.Services.AddAutoMapper(typeof(FuncionarioProfile));

            var app = builder.Build();

            // Depndencia do Swagger
            if (app.Environment.IsDevelopment()) {

                app.UseSwagger();
                app.UseSwaggerUI();
            }



            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment()) {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseFileServer();

            app.UseDefaultFiles();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();

        }
    }
}