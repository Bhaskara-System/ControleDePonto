using ControleDePonto.Data;
using ControleDePonto.Repositories;
using ControleDePonto.Services;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;

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
            builder.Services.AddScoped<UsuarioRepository>();
            builder.Services.AddScoped<UsuarioService>();





            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();


            // Essa Linha configura o banco de dados
            builder.Services.AddDbContext<AppDbContext>(options => 
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));



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