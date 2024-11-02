using Microsoft.EntityFrameworkCore;
using ProyectoASll.Data;
using ProyectoASll.Repositorio.IRepositorio;
using System.Linq.Expressions;
using ProyectoASll.Models;

namespace ProyectoASll.Repositorio
{
    public class Repositorio<T> : IRepositorio<T> where T : class
    {
        //relacionamos esta clase con el DBCONTEXT
        private readonly ApplicationDbContext _context;
        internal DbSet<T> dbset;

        //crear nuestro constructor
        public Repositorio(ApplicationDbContext context)
        {
            _context = context;
            this.dbset = _context.Set<T>();
        }

        public async Task Agregar(T entidad)
        {
            await dbset.AddAsync(entidad); //inserta los registros a la tabla de acuerdo a la entidad
        }

        public void Eliminar(T entidad)
        {
            dbset.Remove(entidad); //elimina un registro
        }

        public void EliminarRango(IEnumerable<T> entidad)
        {
            dbset.RemoveRange(entidad); //elimina un grupo de reistros
        }

        public async Task<T> Obtener(int id)
        {
            return await dbset.FindAsync(id); //genera un tipo select pero filtra solo por el id
        }

        public async Task<T> ObtenerEmpleado(string id)
        {
            return await dbset.FindAsync(id); //genera un tipo select pero filtra solo por el id
        }



        public async Task<T> ObtenerPrimero(Expression<Func<T, bool>> filtro = null, string incluirpropiedades = null, bool isTracking = true)
        {
            IQueryable<T> query = dbset;
            if (filtro != null)
            {
                query = query.Where(filtro); // select * from where
            }
            if (incluirpropiedades != null)
            {
                foreach (var incluirprop in incluirpropiedades.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(incluirprop);  //incluye por ejemplo las propiedades de bodega con oriductos con bodega
                }
            }
            if (!isTracking)
            {
                query = query.AsNoTracking();
            }
            return await query.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> ObtenerTodos(Expression<Func<T, bool>> filtro = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string incluirpropiedades = null, bool isTracking = true)
        {
            IQueryable<T> query = dbset;
            if (filtro != null)
            {
                query = query.Where(filtro); // select * from where
            }
            if (incluirpropiedades != null)
            {
                foreach (var incluirprop in incluirpropiedades.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(incluirprop);  //incluye por ejemplo las propiedades de bodega con oriductos con bodega
                }
            }
            if (orderBy != null)
            {
                query = orderBy(query); //ordenar los datos
            }
            if (!isTracking)
            {
                query = query.AsNoTracking();
            }
            return await query.ToListAsync();
        }

        public async Task<IEnumerable<T>> ObtenerTodosId(
            int id,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string incluirPropiedades = null,
            bool isTracking = true)
                {
                    IQueryable<T> query = dbset;

                    // Asumiendo que deseas filtrar por un campo Id
                    query = query.Where(entity => EF.Property<int>(entity, "Id") == id);

                    if (incluirPropiedades != null)
                    {
                        foreach (var incluirProp in incluirPropiedades.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                        {
                            query = query.Include(incluirProp);
                        }
                    }

                    if (orderBy != null)
                    {
                        query = orderBy(query);
                    }

                    if (!isTracking)
                    {
                        query = query.AsNoTracking();
                    }

                    return await query.ToListAsync();
        }


        public async Task<IEnumerable<MProducto>> ObtenerProductosPorCategoria(int categoriaId)
        {
            // Realiza la consulta utilizando LINQ
            var productos = await _context.Productos
                .Include(p => p.SubCategoria) // Incluye SubCategoria
                .ThenInclude(s => s.Categoria) // Incluye Categoria desde SubCategoria
                .Where(p => p.SubCategoria.CategoriaId == categoriaId) // Filtra por CategoriaId
                .ToListAsync(); // Convierte el resultado a una lista

            return productos;
        }

        /*
        public async Task<IEnumerable<T>> ObtenerPorCategoria(int categoriaId)
        {
            return await ObtenerCategoria(p => p.ProductoVM == categoriaId);
        }
        */
        /*
        public async Task<T> ObtenerImagenUrlEmpleado(string userId)
        {
            // Obtiene la URL de la imagen del empleado basado en su userId
            var imagenUrl = await _context.Empleado // `_context.Empleado` representa la tabla de empleados o IdentityUsers
                .Where(u => u.Id == userId) // Filtra por el ID
                .Select(u => u.ImagenURL)   // Selecciona solo la propiedad `ImagenURL`
                .FirstOrDefaultAsync();     // Devuelve el primer resultado o `null` si no existe

            return await dbset.FindAsync(imagenUrl);
        }*/

        public async Task<string> ObtenerImagenUrlEmpleado(string userId)
        {
            // Obtiene la URL de la imagen del empleado basado en su userId
            var imagenUrl = await _context.Empleado // `_context.Empleado` representa la tabla de empleados o IdentityUsers
                .Where(u => u.Id == userId) // Filtra por el ID
                .Select(u => u.ImagenURL)   // Selecciona solo la propiedad `ImagenURL`
                .FirstOrDefaultAsync();     // Devuelve el primer resultado o `null` si no existe
            if (imagenUrl != null)
            {
                // Retorna la ruta completa
                return Path.Combine(@"/img", imagenUrl); // Ruta relativa
            }
            return "/img/arle.jpg"; // Devuelve la URL de la imagen

        }

        Task<IEnumerable<T>> IRepositorio<T>.ObtenerProductosPorCategoria(int categoriaId)
        {
            throw new NotImplementedException();
        }
    }
}
