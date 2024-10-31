using ProyectoASll.Models;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface IClienteRepositorio : IRepositorio<MCliente>
    {
        //el metodo de actualizar sera individual por cada modelo
        void Actualizar(MCliente mcliente);
    }
}
