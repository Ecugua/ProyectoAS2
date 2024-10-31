namespace ProyectoASll.Repositorio.IRepositorio
{
    public interface IUnidadTrabajo : IDisposable
    {
        //generar una referencia a  los repositorios individuales de marcas
        IMarcaRepositorio MarcaRepositorio { get; }
        //generar una referencia a  los repositorios individuales de categorias
        ICategoriaRepositorio CategoriaRepositorio { get; }
        //generar una referencia a  los repositorios individuales de subcategorias
        ISubCategoriaRepositorio SubCategoriaRepositorio { get; }
        //generar una referencia a  los repositorios individuales de productos
        IProductoRepositorio ProductoRepositorio { get; }
        //generar una referencia a  los repositorios individuales de productos
        IEmpleadoRepositorio EmpleadoRepositorio { get; }
        //generar una referencia a  los repositorios individuales de productos
        IClienteRepositorio ClienteRepositorio { get; }

        //creamos un metodo asincrono para guardar los cambios
        Task Guardar();
    }
}
