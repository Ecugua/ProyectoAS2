using ProyectoASll.Models;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface IDetalleCotizacionRepositorio : IRepositorio<MDetalleCotizacion>
    {
        //el metodo de actualizar sera individual por cada modelo
        void Actualizar(MDetalleCotizacion mdetallecotizacion);
    }
}
