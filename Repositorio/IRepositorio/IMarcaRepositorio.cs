using ProyectoASll.Models;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface IMarcaRepositorio : IRepositorio<MMarca>
    {
        //el metodo de actualizar sera individual por cada modelo
        void Actualizar(MMarca mmarca);
    }
}
