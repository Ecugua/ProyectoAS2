using ProyectoASll.Models;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface ICotizacionRepositorio : IRepositorio<MCotizacion>
    {
        //el metodo de actualizar sera individual por cada modelo
        void Actualizar(MCotizacion mcotizacion);
    }
}
