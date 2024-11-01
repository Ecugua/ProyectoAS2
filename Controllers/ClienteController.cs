using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Models;
using ProyectoASll.Repositorio.IRepositorio;

namespace ProyectoASll.Controllers
{
    public class ClienteController : Controller
    {
        private readonly ILogger<ClienteController> _logger;
        //generar una instancia a la unidad de trabajo
        private readonly IUnidadTrabajo _unidadTrabajo;

        public ClienteController(ILogger<ClienteController> logger, IUnidadTrabajo unidadTrabajo)
        {
            _unidadTrabajo = unidadTrabajo;
            _logger = logger;
        }

        public IActionResult Cliente()
        {
            return View();
        }

        //metodo para crear y actualizar las marcas
        public async Task<IActionResult> Upsert(int? id)
        {
            //hacer referencia al modelo MMarca
            MCliente cliente = new MCliente();
            if (id == null)
            {
                //crear un nuevo cliente
                return View(cliente);
            }
            else
            {
                // actualizar cliente
                cliente = await _unidadTrabajo.ClienteRepositorio.Obtener(id.GetValueOrDefault());
                if (cliente == null)
                {
                    return NotFound();
                }
                return View(cliente);
            }
        }

        //metodo post del Upsert
        [HttpPost]
        [ValidateAntiForgeryToken]//envia los datos con un token de validacion y protege contra ataques csrfe
        public async Task<IActionResult> Upsert(MCliente cliente)
        {
            if (ModelState.IsValid)
            {
                if (cliente.Id == 0)
                {
                    await _unidadTrabajo.ClienteRepositorio.Agregar(cliente);
                    TempData[DefinicionesEstaticas.Exitosa] = "Cliente Creado Exitosamente";
                }
                else
                {
                    _unidadTrabajo.ClienteRepositorio.Actualizar(cliente);
                    TempData[DefinicionesEstaticas.Exitosa] = "Cliente Actualizado Exitosamente";
                }
                await _unidadTrabajo.Guardar();
                return RedirectToAction(nameof(Cliente));
            }
            TempData[DefinicionesEstaticas.Error] = "Error al guardar o actualizar el cliente";
            return View(cliente);
        }
        #region API
        [HttpGet]
        public async Task<IActionResult> obtenerTodos()
        {
            var todos = await _unidadTrabajo.ClienteRepositorio.ObtenerTodos();
            return Json(new { data = todos });
        }
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            //declaramos una variable que obtendra a traves del metodo obtenet el id
            var clienteDB = await _unidadTrabajo.ClienteRepositorio.Obtener(id);
            if (clienteDB == null)
            {
                return Json(new { success = false, message = "Error al borrar Cliente" });
            }
            _unidadTrabajo.ClienteRepositorio.Eliminar(clienteDB);
            await _unidadTrabajo.Guardar();
            return Json(new { success = true, message = "Cliente borrada exitosamente" });
        }

        //generar un metodo para validar el nombre de la marca
        [ActionName("ValidarNombre")]
        public async Task<IActionResult> ValidarNombre(string nombre, int id = 0)
        {
            bool valor = false;
            var lista = await _unidadTrabajo.ClienteRepositorio.ObtenerTodos();
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
