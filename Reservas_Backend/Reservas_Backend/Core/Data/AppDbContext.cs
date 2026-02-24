using Microsoft.EntityFrameworkCore;
using Reservas_Backend.Features.Citas;

namespace Reservas_Backend.Core.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Cita> Citas { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configuraciones adicionales si fueran necesarias
        modelBuilder.Entity<Cita>().HasIndex(c => c.Placa);
    }
}
