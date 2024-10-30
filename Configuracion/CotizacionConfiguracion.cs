using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoASll.Models;

namespace ProyectoASll.Configuracion
{
    public class CotizacionConfiguracion : IEntityTypeConfiguration<MCotizacion>
    {
        public void Configure(EntityTypeBuilder<MCotizacion> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.EmpleadoId).IsRequired();
            builder.Property(x => x.ClienteId).IsRequired();
            builder.Property(x => x.Fecha).HasDefaultValueSql("GETDATE()").IsRequired();
            builder.Property(x => x.Total).IsRequired().HasColumnType("decimal(18,2)"); ;
            // Configuración de las relaciones
            builder.HasOne(x => x.Empleado).WithMany()
                .HasForeignKey(x => x.EmpleadoId)
                .OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(x => x.Cliente).WithMany()
                .HasForeignKey(x => x.ClienteId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
