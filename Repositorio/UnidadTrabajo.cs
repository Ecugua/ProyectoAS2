using ProyectoASll.Data;
using ProyectoASll.Repositorio.IRepositorio;

namespace ProyectoASll.Repositorio
{
    public class UnidadTrabajo : IUnidadTrabajo
    {
        //crear una variable para relacionar la informacion con el ApplicationDBContext
        private readonly ApplicationDbContext _context;
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
        }

        public void Dispose()
        {
            _context.Dispose(); //libera lo que esta en memoria que no estamos utilizando

        }

        public async Task Guardar()
        {
            await _context.SaveChangesAsync(); //Guardamos los cambios y los podemos referenciar en cualquier parte del proyecto
        }
    }
}
