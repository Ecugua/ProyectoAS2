using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Models;
using ProyectoASll.Repositorio.IRepositorio;

namespace ProyectoASll.Controllers
{
    public class MarcaController : Controller
    {
        //generar una instancia a la unidad de trabajo
        private readonly IUnidadTrabajo _unidadTrabajo;

        //ctor para crea el contructor automaticamente
        public MarcaController(IUnidadTrabajo unidadTrabajo)
        {
            _unidadTrabajo = unidadTrabajo;
        }


        public IActionResult Marca()
        {
            return View();
        }

        //metodo para crear y actualizar las marcas
        public async Task<IActionResult> Upsert(int? id)
        {
            //hacer referencia al modelo MMarca
            MMarca marca = new MMarca();
            if (id == null)
            {
                //crear una nueva marca
                marca.Estado = true;
                return View(marca);
            }
            else
            {
                // actualizar la marca
                marca = await _unidadTrabajo.MarcaRepositorio.Obtener(id.GetValueOrDefault());
                if (marca == null)
                {
                    return NotFound();
                }
                return View(marca);
            }
        }

        //metodo post del Upsert
        [HttpPost]
        [ValidateAntiForgeryToken]//envia los datos con un token de validacion y protege contra ataques csrfe
        public async Task<IActionResult> Upsert(MMarca marca)
        {
            if (ModelState.IsValid)
            {
                if (marca.Id == 0)
                {
                    await _unidadTrabajo.MarcaRepositorio.Agregar(marca);
                    TempData[DefinicionesEstaticas.Exitosa] = "Marca Creada Exitosamente";
                }
                else
                {
                    marca.FechaModificacion = DateTime.Now;
                    _unidadTrabajo.MarcaRepositorio.Actualizar(marca);
                    TempData[DefinicionesEstaticas.Exitosa] = "Marca Actualizada Exitosamente";
                }
                await _unidadTrabajo.Guardar();
                return RedirectToAction(nameof(Marca));
            }
            TempData[DefinicionesEstaticas.Error] = "Error al guardar o actualizar la marca";
            return View(marca);
        }

        #region API
        [HttpGet]
        public async Task<IActionResult> obtenerTodos()
        {
            var todos = await _unidadTrabajo.MarcaRepositorio.ObtenerTodos();
            return Json(new { data = todos });
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            //declaramos una variable que obtendra a traves del metodo obtenet el id
            var marcaDB = await _unidadTrabajo.MarcaRepositorio.Obtener(id);
            if (marcaDB == null)
            {
                return Json(new { success = false, message = "Error al borrar Marca" });
            }
            _unidadTrabajo.MarcaRepositorio.Eliminar(marcaDB);
            await _unidadTrabajo.Guardar();
            return Json(new { success = true, message = "Marca borrada exitosamente" });
        }

        //generar un metodo para validar el nombre de la marca
        [ActionName("ValidarNombre")]
        public async Task<IActionResult> ValidarNombre(string nombre, int id = 0)
        {
            bool valor = false;
            var lista = await _unidadTrabajo.MarcaRepositorio.ObtenerTodos();
            //validar si estamos trabajando con una nueva marca o una existente
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
