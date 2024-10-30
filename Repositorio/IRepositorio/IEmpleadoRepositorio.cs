using ProyectoASll.Models;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface IEmpleadoRepositorio : IRepositorio<MEmpleado>
    {
        //el metodo de actualizar sera individual por cada modelo
        void Actualizar(MEmpleado mempleado);
    }
}
