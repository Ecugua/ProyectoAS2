using ProyectoASll.Models;

namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface ISubCategoriaRepositorio : IRepositorio<MSubCategoria>
    {
        //el metodo de actualizar sera individual por cada modelo
        void Actualizar(MSubCategoria msubcategoria);
    }
}
