using Microsoft.AspNetCore.Mvc;

namespace ProyectoASll.Controllers
{
    public class InventarioController : Controller
    {
        public IActionResult Inventario()
        {
            return View();
        }
    }
}
