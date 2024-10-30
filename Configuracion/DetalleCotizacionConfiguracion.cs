using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoASll.Models;

namespace ProyectoASll.Configuracion
{
    public class DetalleCotizacionConfiguracion : IEntityTypeConfiguration<MDetalleCotizacion>
    {
        public void Configure(EntityTypeBuilder<MDetalleCotizacion> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.CotizacionId).IsRequired();
            builder.Property(x => x.ProductoId).IsRequired();
            builder.Property(x => x.Cantidad).IsRequired();
            builder.Property(x => x.Precio).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(x => x.SubTotal).IsRequired().HasColumnType("decimal(18,2)");
            // Configuración de las relaciones
            builder.HasOne(x => x.Cotizacion).WithMany()
                .HasForeignKey(x => x.CotizacionId)
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Producto).WithMany()
                .HasForeignKey(x => x.ProductoId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
