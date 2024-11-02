using Microsoft.AspNetCore.Mvc.Rendering;
using ProyectoASll.Data;
using ProyectoASll.Models;
using ProyectoASll.Repositorio.IRepositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProyectoASll.Repositorio
{
    public class CotizacionRepositorio : Repositorio<MCotizacion>, ICotizacionRepositorio
    {
        //debemos pasar la referencia del aplicationDBcontzt al repositorio padre
        private readonly ApplicationDbContext _context;

        //base(context) por medio de esto, envío la informacion al repositorio padre
        public CotizacionRepositorio(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        
        public void Actualizar(MCotizacion mcotizacion)
        {
            //capturamos la informacion del registro actual, antes de actualizar
            var cotizacionDB = _context.Cotizaciones.FirstOrDefault(b => b.Id == mcotizacion.Id);
            if (cotizacionDB != null)
            {
                cotizacionDB.EmpleadoId = mcotizacion.EmpleadoId;
                cotizacionDB.ClienteId = mcotizacion.ClienteId;
                cotizacionDB.Fecha = mcotizacion.Fecha;
                cotizacionDB.Total = mcotizacion.Total;
                //guardamos la informacion que tiene el modelo en la base de datos
                _context.SaveChanges();
            }
        }

    }
}
