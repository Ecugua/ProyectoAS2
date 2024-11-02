using Microsoft.EntityFrameworkCore.Storage;
using ProyectoASll.Data;
using ProyectoASll.Repositorio.IRepositorio;

namespace ProyectoASll.Repositorio
{
    public class UnidadTrabajo : IUnidadTrabajo
    {
        //crear una variable para relacionar la informacion con el ApplicationDBContext
        private readonly ApplicationDbContext _context;
        private IDbContextTransaction _transaction;

        //creamos una propiedad para obtener y modificar la informacion de marca
        public IMarcaRepositorio MarcaRepositorio { get; private set; }
        //creamos una propiedad para obtener y modificar la informacion de categoria
        public ICategoriaRepositorio CategoriaRepositorio { get; private set; }
        //creamos una propiedad para obtener y modificar la informacion de subcategoria
        public ISubCategoriaRepositorio SubCategoriaRepositorio { get; private set; }
        //creamos una propiedad para obtener y modificar la informacion de producto
        public IProductoRepositorio ProductoRepositorio { get; private set; }
        //creamos una propiedad para obtener y modificar la informacion de empleado
        public IEmpleadoRepositorio EmpleadoRepositorio { get; private set; }
        //creamos una propiedad para obtener y modificar la informacion de cliente
        public IClienteRepositorio ClienteRepositorio { get; private set; }
        //creamos una propiedad para obtener y modificar la informacion de cotizacion
        public ICotizacionRepositorio CotizacionRepositorio { get; private set; }
        //creamos una propiedad para obtener y modificar la informacion de detalle cotizacion
        public IDetalleCotizacionRepositorio DetalleCotizacionRepositorio { get; private set; }

        public UnidadTrabajo(ApplicationDbContext context)
        {
            _context = context;
            //inicializamos la propiedad creada de la marca
            MarcaRepositorio = new MarcaRepositorio(context);
            //inicializamos la propiedad creada de la marca
            CategoriaRepositorio = new CategoriaRepositorio(context);
            //inicializamos la propiedad creada de la marca
            SubCategoriaRepositorio = new SubCategoriaRepositorio(context);
            //inicializamos la propiedad creada del producto
            ProductoRepositorio = new ProductoRepositorio(context);
            //inicializamos la propiedad creada del empleado
            EmpleadoRepositorio = new EmpleadoRepositorio(context);
            //inicializamos la propiedad creada del cliente
            ClienteRepositorio = new ClienteRepositorio(context);
            //inicializamos la propiedad creada del cotizacion
            CotizacionRepositorio = new CotizacionRepositorio(context);
            //inicializamos la propiedad creada de detalle cotizacion
            DetalleCotizacionRepositorio = new DetalleCotizacionRepositorio(context);
        }

        // Métodos para manejar transacciones
        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.CommitAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        public async Task RollbackTransactionAsync()
        {
            if (_transaction != null)
            {
                await _transaction.RollbackAsync();
                await _transaction.DisposeAsync();
                _transaction = null;
            }
        }

        // Guardar cambios
        public async Task Guardar()
        {
            await _context.SaveChangesAsync(); //Guardamos los cambios y los podemos referenciar en cualquier parte del proyecto
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _context.Dispose();//libera lo que esta en memoria que no estamos utilizando
        }
    }
}
