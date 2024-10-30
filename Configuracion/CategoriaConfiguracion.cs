using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoASll.Models;

namespace ProyectoASll.Configuracion
{
    public class CategoriaConfiguracion : IEntityTypeConfiguration<MCategoria>
    {
        public void Configure(EntityTypeBuilder<MCategoria> builder)
        {
            //agregar las propiedades del modelo categoria 1 x 1 para realizar el override y la aplicacion de fluent API
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Nombre).IsRequired().HasMaxLength(60);
            builder.Property(x => x.Estado);
            // Configurando FechaDeCreacion como opcional
            builder.Property(u => u.FechaCreacion)
                .HasDefaultValueSql("GETDATE()")  // Valor predeterminado es la fecha actual
                .IsRequired(false);  // No es obligatorio

            // Configurando FechaDeModificacion como opcional
            builder.Property(u => u.FechaModificacion)
                .IsRequired(false);  // No es obligatorio, puede ser nulo
        }
    }
}
