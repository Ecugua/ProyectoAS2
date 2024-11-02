using Microsoft.AspNetCore.Mvc;
using ProyectoASll.Models;
using ProyectoASll.Repositorio.IRepositorio;
using ProyectoASll.ViewModels;
using System;
using System.Threading.Tasks;
using System.Linq;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace ProyectoASll.Controllers
{
    public class CotizacionController : Controller
    {
        private readonly IUnidadTrabajo _unidadTrabajo;

        public CotizacionController(IUnidadTrabajo unidadTrabajo)
        {
            _unidadTrabajo = unidadTrabajo;
        }

        public IActionResult Cotizacion()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CrearCotizacion(CotizacionVM cotizacionVM)
        {
            await _unidadTrabajo.BeginTransactionAsync(); // Iniciar la transacción

            try
            {
                // Crear la nueva cotización
                var nuevaCotizacion = new MCotizacion
                {
                    ClienteId = cotizacionVM.ClienteId,
                    Fecha = DateTime.Now,
                    Total = cotizacionVM.Detalles.Sum(d => d.Precio * d.Cantidad)
                };

                await _unidadTrabajo.CotizacionRepositorio.Agregar(nuevaCotizacion);
                await _unidadTrabajo.Guardar();
                int cotizacionId = nuevaCotizacion.Id;

                // Crear los detalles de la cotización
                foreach (var detalle in cotizacionVM.Detalles)
                {
                    var detalleCotizacion = new MDetalleCotizacion
                    {
                        CotizacionId = cotizacionId,
                        ProductoId = detalle.ProductoId,
                        Cantidad = detalle.Cantidad,
                        Precio = detalle.Precio,
                        SubTotal = detalle.Precio * detalle.Cantidad
                    };

                    await _unidadTrabajo.DetalleCotizacionRepositorio.Agregar(detalleCotizacion);
                }

                await _unidadTrabajo.Guardar();
                await _unidadTrabajo.CommitTransactionAsync(); // Confirmar la transacción

                return Ok(new { Message = "Cotización creada exitosamente", CotizacionId = cotizacionId });
            }
            catch (Exception ex)
            {
                await _unidadTrabajo.RollbackTransactionAsync(); // Revertir la transacción en caso de error
                return BadRequest(new { Message = "Error al crear la cotización", Error = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> obtenerTodos()
        {
            // Con esto nos devolverá los campos de categoría y marca para incorporarlos a la vista producto
            var todos = await _unidadTrabajo.ProductoRepositorio.ObtenerTodos(incluirpropiedades: "SubCategoria,Marca");
            return Json(new { data = todos });
        }

        

    }
}

