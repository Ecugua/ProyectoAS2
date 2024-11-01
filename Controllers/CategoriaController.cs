using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Models;
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

        //metodo para crear y actualizar las marcas
        public async Task<IActionResult> Upsert(int? id)
        {
            //hacer referencia al modelo MMarca
            MCategoria categoria = new MCategoria();
            if (id == null)
            {
                //crear una nueva categoria
                categoria.Estado = true;
                return View(categoria);
            }
            else
            {
                // actualizar la categoria
                categoria = await _unidadTrabajo.CategoriaRepositorio.Obtener(id.GetValueOrDefault());
                if (categoria == null)
                {
                    return NotFound();
                }
                return View(categoria);
            }
        }
        //metodo post del Upsert
        [HttpPost]
        [ValidateAntiForgeryToken]//envia los datos con un token de validacion y protege contra ataques csrfe
        public async Task<IActionResult> Upsert(MCategoria categoria)
        {
            if (ModelState.IsValid)
            {
                if (categoria.Id == 0)
                {
                    await _unidadTrabajo.CategoriaRepositorio.Agregar(categoria);
                    TempData[DefinicionesEstaticas.Exitosa] = "categoria Creada Exitosamente";
                }
                else
                {
                    categoria.FechaModificacion = DateTime.Now;
                    _unidadTrabajo.CategoriaRepositorio.Actualizar(categoria);
                    TempData[DefinicionesEstaticas.Exitosa] = "Categoria Actualizada Exitosamente";
                }
                await _unidadTrabajo.Guardar();
                return RedirectToAction(nameof(Categoria));
            }
            TempData[DefinicionesEstaticas.Error] = "Error al guardar o actualizar la categoria";
            return View(categoria);
        }
        #region API
        [HttpGet]
        public async Task<IActionResult> obtenerTodos()
        {
            var todos = await _unidadTrabajo.CategoriaRepositorio.ObtenerTodos();
            return Json(new { data = todos });
        }
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            //declaramos una variable que obtendra a traves del metodo obtenet el id
            var categoriaDB = await _unidadTrabajo.CategoriaRepositorio.Obtener(id);
            if (categoriaDB == null)
            {
                return Json(new { success = false, message = "Error al borrar Categoria" });
            }
            _unidadTrabajo.CategoriaRepositorio.Eliminar(categoriaDB);
            await _unidadTrabajo.Guardar();
            return Json(new { success = true, message = "Categoria borrada exitosamente" });
        }

        //generar un metodo para validar el nombre de la categoria
        [ActionName("ValidarNombre")]
        public async Task<IActionResult> ValidarNombre(string nombre, int id = 0)
        {
            bool valor = false;
            var lista = await _unidadTrabajo.CategoriaRepositorio.ObtenerTodos();
            //validar si estamos trabajando con una nueva catergoria o una existente
            if (id == 0)
            {
                valor = lista.Any(b => b.Nombre.ToLower().Trim() == nombre.ToLower().Trim());
            }
            else
            {
                valor = lista.Any(b => b.Nombre.ToLower().Trim() == nombre.ToLower().Trim() && b.Id != id);
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
