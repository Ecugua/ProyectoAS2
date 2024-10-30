using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProyectoASll.Models;

namespace ProyectoASll.Configuracion
{
    public class SubCategoriaConfiguracion : IEntityTypeConfiguration<MSubCategoria>
    {
        public void Configure(EntityTypeBuilder<MSubCategoria> builder)
        {
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
            builder.Property(x => x.CategoriaId).IsRequired(); // Llave foránea
            //crear las relaciones entre categoria y producto, atraves del categoriaid
            builder.HasOne(x => x.Categoria).WithMany()
                .HasForeignKey(x => x.CategoriaId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
