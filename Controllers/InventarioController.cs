using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Repositorio.IRepositorio;
using ProyectoASll.ViewModels;
using System.Security.Claims;

namespace ProyectoASll.Controllers
{
    public class InventarioController : Controller
    {
        private readonly ILogger<InventarioController> _logger;
        //generar una instancia a la unidad de trabajo
        private readonly IUnidadTrabajo _unidadTrabajo;

        public InventarioController(ILogger<InventarioController> logger, IUnidadTrabajo unidadTrabajo)
        {
            _unidadTrabajo = unidadTrabajo;
            _logger = logger;
        }
        public async Task<IActionResult> Inventario()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "Usuario no autenticado" });
            }

            var empleado = await _unidadTrabajo.EmpleadoRepositorio.ObtenerEmpleado(userId);
            if (empleado == null)
            {
                return NotFound(new { message = "Empleado no encontrado" });
            }
            var empleadoViewModel = new EmpleadoVM
            {
                Nombre = empleado.Nombre,
                Rol = empleado.Rol,
                Telefono = empleado.Numero,
                Email = empleado.Email,
                ImagenUrl = empleado.ImagenURL ?? "/img/arle.jpg"
            };
            return View(empleadoViewModel);
            return View();
        }
    }
}
