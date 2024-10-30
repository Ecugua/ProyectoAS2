using ProyectoASll.Models;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface IProductoRepositorio : IRepositorio<MProducto>
    {
        //el metodo de actualizar sera individual por cada modelo
        void Actualizar(MProducto mproducto);
    }
}
