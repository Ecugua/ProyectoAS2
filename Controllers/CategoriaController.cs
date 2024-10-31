using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Repositorio.IRepositorio;

namespace ProyectoASll.Controllers
{    
    public class CategoriaController : Controller
    {
        private readonly ILogger<CategoriaController> _logger;
        //generar una instancia a la unidad de trabajo
        private readonly IUnidadTrabajo _unidadTrabajo;

        public CategoriaController(ILogger<CategoriaController> logger, IUnidadTrabajo unidadTrabajo)
        {
            _unidadTrabajo = unidadTrabajo;
            _logger = logger;
        }

        public IActionResult Categoria()
        {
            return View();
        }

        #region API
        [HttpGet]
        public async Task<IActionResult> obtenerTodos()
        {
            var todos = await _unidadTrabajo.CategoriaRepositorio.ObtenerTodos();
            return Json(new { data = todos });
        }
        #endregion
    }

}
