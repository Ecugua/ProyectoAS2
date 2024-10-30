using ProyectoASll.Models;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface ICategoriaRepositorio : IRepositorio<MCategoria>
    {
        //el metodo de actualizar sera individual por cada modelo
        void Actualizar(MCategoria mcategoria);
    }
}
