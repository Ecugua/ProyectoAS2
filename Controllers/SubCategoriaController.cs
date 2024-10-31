using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Repositorio.IRepositorio;

namespace ProyectoASll.Controllers
{
    public class SubCategoriaController : Controller
    {
        private readonly ILogger<SubCategoriaController> _logger;
        //generar una instancia a la unidad de trabajo
        private readonly IUnidadTrabajo _unidadTrabajo;

        public SubCategoriaController(ILogger<SubCategoriaController> logger, IUnidadTrabajo unidadTrabajo)
        {
            _unidadTrabajo = unidadTrabajo;
            _logger = logger;
        }

        public IActionResult SubCategoria()
        {
            return View();
        }

        #region API
        [HttpGet]
        public async Task<IActionResult> obtenerTodos()
        {
            var todos = await _unidadTrabajo.SubCategoriaRepositorio.ObtenerTodos();
            return Json(new { data = todos });
        }
        #endregion
    }
}
