using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Models;
using ProyectoASll.Repositorio.IRepositorio;
using ProyectoASll.ViewModels;
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

        public IActionResult Producto()
        {
            return View();
        }

        //metodo para crear y actualizar los productos
        public async Task<IActionResult> Upsert(int? id)
        {
            //generamos un instancia al productoVM
            ProductoVM productovm = new ProductoVM()
            {
                Mproducto = new MProducto(),
                SubCategoriaLista = _unidadTrabajo.ProductoRepositorio.ObtenerTodosLista("SubCategoria"),
                MarcaLista = _unidadTrabajo.ProductoRepositorio.ObtenerTodosLista("Marca")
            };
            //validad si vamos a crear un nuevo producto o si lo vamos a actualizar
            if (id == null)
            {
                //crear nuevo producto
                return View(productovm);
            }
            else
            {
                productovm.Mproducto = await _unidadTrabajo.ProductoRepositorio.Obtener(id.GetValueOrDefault());
                //validamos si existe
                if (productovm.Mproducto == null)
                {
                    return NotFound();
                }
                return View(productovm);
            }

        }
        //metodo post del Upsert
        [HttpPost]
        [ValidateAntiForgeryToken]//envia los datos con un token de validacion y protege contra ataques csrfe
        public async Task<IActionResult> Upsert(ProductoVM productovm)
        {

            if (ModelState.IsValid)
            {

                if (productovm.Mproducto.Id == 0)
                {
                    //creae nuevo producto
                    await _unidadTrabajo.ProductoRepositorio.Agregar(productovm.Mproducto);
                    TempData[DefinicionesEstaticas.Exitosa] = "Producto Creado Exitosamente";
                }
                else
                {
                    //actualizar producto
                    _unidadTrabajo.ProductoRepositorio.Actualizar(productovm.Mproducto);
                    TempData[DefinicionesEstaticas.Exitosa] = "Producto Actualizado Exitosamente";
                }
                await _unidadTrabajo.Guardar();
                return RedirectToAction(nameof(Producto));
            }
            // Recarga listas de categorías y marcas en caso de error de validación
            productovm.SubCategoriaLista = _unidadTrabajo.ProductoRepositorio.ObtenerTodosLista("SubCategoria");
            productovm.MarcaLista = _unidadTrabajo.ProductoRepositorio.ObtenerTodosLista("Marca");
            TempData[DefinicionesEstaticas.Error] = "Error al guardar o actualizar el Producto";
            return View(productovm);
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
