using System.Linq.Expressions;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface IRepositorio<T> where T : class
    {
        Task<T> Obtener(int id);
        Task<T> ObtenerEmpleado(string id);
        Task<IEnumerable<T>> ObtenerTodos(Expression<Func<T, bool>> filtro = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string incluirpropiedades = null,
            bool isTracking = true);

        Task<T> ObtenerPrimero(Expression<Func<T, bool>> filtro = null,
            string incluirpropiedades = null,
            bool isTracking = true);

        Task Agregar(T entidad);
        void Eliminar(T entidad);
        void EliminarRango(IEnumerable<T> entidad);
        Task<string> ObtenerImagenUrlEmpleado(string userId);

        // Este método es específico para el repositorio de productos
        Task<IEnumerable<T>> ObtenerProductosPorCategoria(int categoriaId);
        // Nuevo método para obtener entidades por un id específico
        Task<IEnumerable<T>> ObtenerTodosId(int id,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string incluirpropiedades = null,
            bool isTracking = true);
    }
}
