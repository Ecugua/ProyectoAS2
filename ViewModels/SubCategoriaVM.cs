using Microsoft.AspNetCore.Mvc.Rendering;
using ProyectoASll.Models;

namespace ProyectoASll.ViewModels
{
    public class SubCategoriaVM
    {
        public MSubCategoria MSubCategoria { get; set; }
        //generar un codigo para obtener la lista de elementos de categorias y marcas
        public IEnumerable<SelectListItem> CategoriaLista { get; set; }

    }
}
