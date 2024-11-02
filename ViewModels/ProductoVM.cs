using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using ProyectoASll.Models;
using System.Collections.Generic;

namespace ProyectoASll.ViewModels
{
    public class ProductoVM
    {
        public MProducto Mproducto { get; set; }

        // Propiedad para el archivo de imagen cargado
        public IFormFile ImagenArchivo { get; set; }

        // Listas para los elementos de categorías y marcas
        public IEnumerable<SelectListItem> SubCategoriaLista { get; set; }
        public IEnumerable<SelectListItem> MarcaLista { get; set; }
    }
}
