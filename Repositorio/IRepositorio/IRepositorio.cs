using System.Linq.Expressions;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface IRepositorio<T> where T : class
    {
        Task<T> Obtener(int id);

        Task<T> ObtenerEmpleado(String id);

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

        //Task<T> ObtenerImagenUrlEmpleado(string img);
        Task<string> ObtenerImagenUrlEmpleado(string userId);
    }
}
