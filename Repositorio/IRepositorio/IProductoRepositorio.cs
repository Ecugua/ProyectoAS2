using Microsoft.AspNetCore.Mvc.Rendering;
using ProyectoASll.Models;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface IProductoRepositorio : IRepositorio<MProducto>
    {
        //el metodo de actualizar sera individual por cada modelo
        void Actualizar(MProducto mproducto);
        //metodo para obtener las listas de categorias y marcas
        IEnumerable<SelectListItem> ObtenerTodosLista(string obj);
    }
}
