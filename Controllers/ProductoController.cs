using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Models;
using ProyectoASll.Repositorio.IRepositorio;
using ProyectoASll.ViewModels;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace ProyectoASll.Controllers
{
    public class ProductoController : Controller
    {
        // Generar una instancia a la unidad de trabajo
        private readonly IUnidadTrabajo _unidadTrabajo;
        // Declarar una variable para controlar los accesos a nuestras rutas estáticas
        private readonly IWebHostEnvironment _webHostEnvironment;

        // Constructor para crear el controlador automáticamente
        public ProductoController(IUnidadTrabajo unidadTrabajo, IWebHostEnvironment webHostEnvironment)
        {
            _unidadTrabajo = unidadTrabajo;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Producto()
        {
            return View();
        }

        // Método para crear y actualizar los productos
        public async Task<IActionResult> Upsert(int? id)
        {
            // Generamos una instancia del productoVM
            ProductoVM productovm = new ProductoVM()
            {
                Mproducto = new MProducto(),
                SubCategoriaLista = _unidadTrabajo.ProductoRepositorio.ObtenerTodosLista("SubCategoria"),
                MarcaLista = _unidadTrabajo.ProductoRepositorio.ObtenerTodosLista("Marca")
            };
            // Validar si vamos a crear un nuevo producto o si lo vamos a actualizar
            if (id == null)
            {
                // Crear nuevo producto
                return View(productovm);
            }
            else
            {
                productovm.Mproducto = await _unidadTrabajo.ProductoRepositorio.Obtener(id.GetValueOrDefault());
                // Validar si existe
                if (productovm.Mproducto == null)
                {
                    return NotFound();
                }
                return View(productovm);
            }
        }

        // Método POST del Upsert
        [HttpPost]
        [ValidateAntiForgeryToken] // Envía los datos con un token de validación y protege contra ataques CSRF
        public async Task<IActionResult> Upsert(ProductoVM productovm)
        {
            if (ModelState.IsValid)
            {
                // Definir la ruta de almacenamiento en /img
                string uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, "img");
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                if (productovm.ImagenArchivo != null)
                {
                    // Si existe una imagen anterior y se está actualizando, elimínala
                    if (!string.IsNullOrEmpty(productovm.Mproducto.ImagenURL))
                    {
                        var anteriorFile = Path.Combine(uploadPath, productovm.Mproducto.ImagenURL);
                        if (System.IO.File.Exists(anteriorFile))
                        {
                            System.IO.File.Delete(anteriorFile);
                        }
                    }

                    // Guardar la nueva imagen
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(productovm.ImagenArchivo.FileName);
                    string filePath = Path.Combine(uploadPath, fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await productovm.ImagenArchivo.CopyToAsync(fileStream);
                    }

                    // Asignar la URL de la imagen al modelo
                    productovm.Mproducto.ImagenURL = "/img/" + fileName;
                }

                if (productovm.Mproducto.Id == 0)
                {
                    // Crear nuevo producto
                    await _unidadTrabajo.ProductoRepositorio.Agregar(productovm.Mproducto);
                    TempData["Exitosa"] = "Producto Creado Exitosamente";
                }
                else
                {
                    // Actualizar producto
                    _unidadTrabajo.ProductoRepositorio.Actualizar(productovm.Mproducto);
                    TempData["Exitosa"] = "Producto Actualizado Exitosamente";
                }

                await _unidadTrabajo.Guardar();
                return RedirectToAction(nameof(Producto));
            }

            // Recarga listas de categorías y marcas en caso de error de validación
            productovm.SubCategoriaLista = _unidadTrabajo.ProductoRepositorio.ObtenerTodosLista("SubCategoria");
            productovm.MarcaLista = _unidadTrabajo.ProductoRepositorio.ObtenerTodosLista("Marca");
            TempData["Error"] = "Error al guardar o actualizar el Producto";
            return View(productovm);
        }

        #region API

        [HttpGet]
        public async Task<IActionResult> obtenerTodos()
        {
            // Con esto nos devolverá los campos de categoría y marca para incorporarlos a la vista producto
            var todos = await _unidadTrabajo.ProductoRepositorio.ObtenerTodos(incluirpropiedades: "SubCategoria,Marca");
            return Json(new { data = todos });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            // Declaramos una variable que obtendrá a través del método obtener el id
            var productoDB = await _unidadTrabajo.ProductoRepositorio.Obtener(id);
            if (productoDB == null)
            {
                return Json(new { success = false, message = "Error al borrar Producto" });
            }
            // Eliminar la imagen
            string upload = Path.Combine(_webHostEnvironment.WebRootPath, "img");
            var anteriorFile = Path.Combine(upload, productoDB.ImagenURL);
            if (System.IO.File.Exists(anteriorFile))
            {
                System.IO.File.Delete(anteriorFile);
            }
            _unidadTrabajo.ProductoRepositorio.Eliminar(productoDB);
            await _unidadTrabajo.Guardar();
            return Json(new { success = true, message = "Producto borrado exitosamente" });
        }

        // Generar un método para validar la serie del producto
        [ActionName("ValidarSerie")]
        public async Task<IActionResult> ValidarSerie(string serie, int id = 0)
        {
            bool valor = false;
            var lista = await _unidadTrabajo.ProductoRepositorio.ObtenerTodos();
            // Validar si estamos trabajando con un nuevo producto o uno existente
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
