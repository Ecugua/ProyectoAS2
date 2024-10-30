using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Models;
using ProyectoASll.Repositorio.IRepositorio;
using System.Diagnostics;
using System.Security.Claims;

namespace ProyectoASll.Controllers
{
    public class EmpleadoController : Controller
    {
        //generar una instancia a la unidad de trabajo
        private readonly IUnidadTrabajo _unidadTrabajo;
        //declarar una variable para controlar los accesos a nuestras rutas estaticas
        private readonly IWebHostEnvironment _webHostEnvironment;

        //ctor para crea el contructor automaticamente
        public EmpleadoController(IUnidadTrabajo unidadTrabajo, IWebHostEnvironment webHostEnvironment)
        {
            _unidadTrabajo = unidadTrabajo;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            return View();
        }

        #region API
        [HttpGet]
        public async Task<IActionResult> obtenerimagen()
        {
            // Obtener el ID del empleado logueado
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //con esto nos devolvera los campos de empleado
            var todos = await _unidadTrabajo.EmpleadoRepositorio.ObtenerImagenUrlEmpleado(id);
            return Json(new { data = todos });
        }

        [HttpGet]
        public async Task<IActionResult> obtenerTodos()
        {
            //con esto nos devolvera los campos de empleado
            var todos = await _unidadTrabajo.EmpleadoRepositorio.ObtenerTodos();
            return Json(new { data = todos });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            //declaramos una variable que obtendra a traves del metodo obtenet el id
            var empleadoDB = await _unidadTrabajo.EmpleadoRepositorio.Obtener(id);
            if (empleadoDB == null)
            {
                return Json(new { success = false, message = "Error al borrar empleado" });
            }
            //eliminar la imagen
            string upload = _webHostEnvironment.WebRootPath + DefinicionesEstaticas.ImagenRuta;
            var anteriorFile = Path.Combine(upload, empleadoDB.ImagenURL);
            if (System.IO.File.Exists(anteriorFile))
            {
                System.IO.File.Delete(anteriorFile);
            }
            _unidadTrabajo.EmpleadoRepositorio.Eliminar(empleadoDB);
            await _unidadTrabajo.Guardar();
            return Json(new { success = true, message = "Empleado borrado exitosamente" });
        }

        #endregion
    }
}
