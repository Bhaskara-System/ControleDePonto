using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using ControleDePonto.Models;



namespace ControleDePonto.Data {
    public class AppDbContext : DbContext {


        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }



        // Configuração da relação de 1 para 0..1
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
                .HasOne(u => u.Funcionario)
                .WithOne(f => f.Usuario)
                .HasForeignKey<Usuario>(u => u.FuncionarioId)
                .OnDelete(DeleteBehavior.Cascade); // Se deletar funcionário, remove o login dele

            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.FuncionarioId)
                .IsUnique();
        }

    }
}
