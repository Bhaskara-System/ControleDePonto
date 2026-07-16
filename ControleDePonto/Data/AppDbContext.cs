using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using ControleDePonto.Models;



namespace ControleDePonto.Data {
    public class AppDbContext : DbContext {


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }

    }
}
