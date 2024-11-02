using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Repositorio.IRepositorio;
using System.Threading.Tasks;

namespace ProyectoASll.Controllers
{
    public class CatalogoController : Controller
    {
        private readonly IUnidadTrabajo _unidadTrabajo;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CatalogoController(IUnidadTrabajo unidadTrabajo, IWebHostEnvironment webHostEnvironment)
        {
            _unidadTrabajo = unidadTrabajo;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Catalogo()
        {
            return View();
        }

        public IActionResult CatalogoView()
        {
            return View();
        }

        #region API

        [HttpGet]
        public async Task<JsonResult> obtenerTodos()
        {
            var todos = await _unidadTrabajo.ProductoRepositorio.ObtenerTodos(incluirpropiedades: "SubCategoria,Marca");
            return Json(new { data = todos });
        }

        [HttpGet]
        public async Task<JsonResult> ObtenerProductosPorCategoria(int categoriaId)
        {
            // Filtrar productos por el ID de la categoría especificado
            var todos = await _unidadTrabajo.ProductoRepositorio.ObtenerTodos(incluirpropiedades: "SubCategoria,Marca");
            // Filtra los productos asegurándote de que SubCategoria no sea null
            var filtro = todos.Where(p => p.SubCategoria != null && p.SubCategoria.CategoriaId == categoriaId);

            return Json(new { data = filtro });

        }

        #endregion
    }
}

