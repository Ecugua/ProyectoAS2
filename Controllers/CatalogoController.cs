using Microsoft.AspNetCore.Mvc;

namespace ProyectoASll.Controllers
{
    public class CatalogoController : Controller
    {
        public IActionResult Catalogo()
        {
            return View();
        }

        public IActionResult CatalogoView()
        {
            return View();
        }
    }
}
