using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProyectoASll.Models;
using System.Reflection;

namespace ProyectoASll.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        //referencia por medio  de la propiedad DBset  al medelo categoria  
        public DbSet<MCategoria> Categorias { get; set; }
        //referencia por medio  de la propiedad DBset  al medelo subcategoria  
        public DbSet<MSubCategoria> SubCategorias { get; set; }
        //referencia por medio  de la propiedad DBset  al medelo empleado
        public DbSet<MEmpleado> Empleado { get; set; }
        //referencia por medio  de la propiedad DBset  al medelo cliente
        public DbSet<MCliente> Clientes { get; set; }
        //referencia por medio  de la propiedad DBset  al medelo Cotizacion
        public DbSet<MCotizacion> Cotizaciones { get; set; }
        //referencia por medio  de la propiedad DBset  al medelo Marca
        public DbSet<MMarca> Marcas { get; set; }
        //referencia por medio  de la propiedad DBset  al medelo Producto
        public DbSet<MProducto> Productos { get; set; }
        //referencia por medio  de la propiedad DBset  al medelo detallescotizacion
        public DbSet<MDetalleCotizacion> DetallesCotizacion { get; set; }

        //utilizar un override para cambiar las caracteristicas de un metodo existente
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
