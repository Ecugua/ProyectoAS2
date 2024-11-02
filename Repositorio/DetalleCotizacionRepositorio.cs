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
    public class DetalleCotizacionRepositorio : Repositorio<MDetalleCotizacion>, IDetalleCotizacionRepositorio
    {
        //debemos pasar la referencia del aplicationDBcontzt al repositorio padre
        private readonly ApplicationDbContext _context;

        //base(context) por medio de esto, envío la informacion al repositorio padre
        public DetalleCotizacionRepositorio(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        
        public void Actualizar(MDetalleCotizacion mdetallecotizacion)
        {
            //capturamos la informacion del registro actual, antes de actualizar
            var detallecotizacionDB = _context.DetallesCotizacion.FirstOrDefault(b => b.Id == mdetallecotizacion.Id);
            if (detallecotizacionDB != null)
            {
                detallecotizacionDB.CotizacionId = mdetallecotizacion.CotizacionId;
                detallecotizacionDB.ProductoId = mdetallecotizacion.ProductoId;
                detallecotizacionDB.Cantidad = mdetallecotizacion.Cantidad;
                detallecotizacionDB.Precio = mdetallecotizacion.Precio;
                detallecotizacionDB.SubTotal = mdetallecotizacion.SubTotal;
                //guardamos la informacion que tiene el modelo en la base de datos
                _context.SaveChanges();
            }
        }

    }
}
