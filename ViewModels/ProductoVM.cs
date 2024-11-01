using Microsoft.AspNetCore.Mvc.Rendering;
using ProyectoASll.Models;

namespace ProyectoASll.ViewModels
{
    public class ProductoVM
    {
        public MProducto Mproducto { get; set; }
        //generar un codigo para obtener la lista de elementos de categorias y marcas
        public IEnumerable<SelectListItem> SubCategoriaLista { get; set; }

        public IEnumerable<SelectListItem> MarcaLista { get; set; }
    }
}
