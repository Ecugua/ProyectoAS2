using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoASll.Models;

namespace ProyectoASll.Configuracion
{
    public class ClienteConfiguracion : IEntityTypeConfiguration<MCliente>
    {
        public void Configure(EntityTypeBuilder<MCliente> builder)
        {
            //agregar las propiedades del modelo categoria 1 x 1 para realizar el override y la aplicacion de fluent API
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Nombre).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Apellido).IsRequired().HasMaxLength(100);
            builder.Property(x => x.CorreoElectronico).IsRequired();
            builder.Property(x => x.Direccion).IsRequired();
            builder.Property(u => u.Numero).IsRequired().HasMaxLength(15);
                
        }
    }
}
