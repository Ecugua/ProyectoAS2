using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Models;
using ProyectoASll.Repositorio.IRepositorio;
using ProyectoASll.ViewModels;

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

        //metodo para crear y actualizar las subcategoria
        public async Task<IActionResult> Upsert(int? id)
        {
            //generamos un instancia al subcategoriaVM
            SubCategoriaVM subcategoriavm = new SubCategoriaVM()
            {
                MSubCategoria = new MSubCategoria(),
                CategoriaLista = _unidadTrabajo.SubCategoriaRepositorio.ObtenerTodosLista("Categoria"),
            };
            if (id == null)
            {
                //crear una nueva subcategoria
                return View(subcategoriavm);
            }
            else
            {
                // actualizar la categoria
                subcategoriavm.MSubCategoria = await _unidadTrabajo.SubCategoriaRepositorio.Obtener(id.GetValueOrDefault());
                if (subcategoriavm == null)
                {
                    return NotFound();
                }
                return View(subcategoriavm);
            }
        }
        //metodo post del Upsert
        [HttpPost]
        [ValidateAntiForgeryToken]//envia los datos con un token de validacion y protege contra ataques csrfe
        public async Task<IActionResult> Upsert(SubCategoriaVM subcategoriavm)
        {
            if (ModelState.IsValid)
            {
                if (subcategoriavm.MSubCategoria.Id == 0)
                {
                    await _unidadTrabajo.SubCategoriaRepositorio.Agregar(subcategoriavm.MSubCategoria);
                    TempData[DefinicionesEstaticas.Exitosa] = "SubCategoria Creada Exitosamente";
                }
                else
                {
                    subcategoriavm.MSubCategoria.FechaModificacion = DateTime.Now;
                    _unidadTrabajo.SubCategoriaRepositorio.Actualizar(subcategoriavm.MSubCategoria);
                    TempData[DefinicionesEstaticas.Exitosa] = "SubCategoria Actualizada Exitosamente";
                }
                await _unidadTrabajo.Guardar();
                return RedirectToAction(nameof(SubCategoria));
            }
            // Recarga listas de categorías y marcas en caso de error de validación
            subcategoriavm.CategoriaLista = _unidadTrabajo.SubCategoriaRepositorio.ObtenerTodosLista("Categoria");
            TempData[DefinicionesEstaticas.Error] = "Error al guardar o actualizar la subcategoria";
            return View(subcategoriavm);
        }
        #region API
        [HttpGet]
        public async Task<IActionResult> obtenerTodos()
        {
            var todos = await _unidadTrabajo.SubCategoriaRepositorio.ObtenerTodos();
            return Json(new { data = todos });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            //declaramos una variable que obtendra a traves del metodo obtenet el id
            var subcategoriaDB = await _unidadTrabajo.SubCategoriaRepositorio.Obtener(id);
            if (subcategoriaDB == null)
            {
                return Json(new { success = false, message = "Error al borrar subCategoria" });
            }
            _unidadTrabajo.SubCategoriaRepositorio.Eliminar(subcategoriaDB);
            await _unidadTrabajo.Guardar();
            return Json(new { success = true, message = "Categoria borrada exitosamente" });
        }

        //generar un metodo para validar el nombre de la categoria
        [ActionName("ValidarNombre")]
        public async Task<IActionResult> ValidarNombre(string nombre, int id = 0)
        {
            bool valor = false;
            var lista = await _unidadTrabajo.SubCategoriaRepositorio.ObtenerTodos();
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
