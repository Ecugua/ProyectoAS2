using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Repositorio.IRepositorio;

namespace ProyectoASll.Controllers
{
    public class ProductoController : Controller
    {
        //generar una instancia a la unidad de trabajo
        private readonly IUnidadTrabajo _unidadTrabajo;
        //declarar una variable para controlar los accesos a nuestras rutas estaticas
        private readonly IWebHostEnvironment _webHostEnvironment;

        //ctor para crea el contructor automaticamente
        public ProductoController(IUnidadTrabajo unidadTrabajo, IWebHostEnvironment webHostEnvironment)
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
        public async Task<IActionResult> obtenerTodos()
        {
            //con esto nos devolvera los campos de categoria y marca para incorporarlos a la vista producto
            var todos = await _unidadTrabajo.ProductoRepositorio.ObtenerTodos(incluirpropiedades: "SubCategoria,Marca");
            return Json(new { data = todos });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            //declaramos una variable que obtendra a traves del metodo obtenet el id
            var productoDB = await _unidadTrabajo.ProductoRepositorio.Obtener(id);
            if (productoDB == null)
            {
                return Json(new { success = false, message = "Error al borrar Producto" });
            }
            //eliminar la imagen
            string upload = _webHostEnvironment.WebRootPath + DefinicionesEstaticas.ImagenRuta;
            var anteriorFile = Path.Combine(upload, productoDB.ImagenURL);
            if (System.IO.File.Exists(anteriorFile))
            {
                System.IO.File.Delete(anteriorFile);
            }
            _unidadTrabajo.ProductoRepositorio.Eliminar(productoDB);
            await _unidadTrabajo.Guardar();
            return Json(new { success = true, message = "Producto borrado exitosamente" });
        }

        //generar un metodo para validar la serie del producto
        [ActionName("ValidarSerie")]
        public async Task<IActionResult> ValidarSerie(string serie, int id = 0)
        {
            bool valor = false;
            var lista = await _unidadTrabajo.ProductoRepositorio.ObtenerTodos();
            //validar si estamos trabajando con una nuevo producto o uno existente
            if (id == 0)
            {
                valor = lista.Any(b => b.Modelo.ToLower().Trim() == serie.ToLower().Trim());
            }
            else
            {
                valor = lista.Any(b => b.Modelo.ToLower().Trim() == serie.ToLower().Trim() && b.Id != id);
            }
            if (valor == true)
            {
                return Json(new { data = true });
            }
            return Json(new { data = false });
        }

        #endregion
    }
}
