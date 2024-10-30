using ProyectoASll.Data;
using ProyectoASll.Models;
using ProyectoASll.Repositorio.IRepositorio;

namespace ProyectoASll.Repositorio
{
    public class MarcaRepositorio : Repositorio<MMarca>, IMarcaRepositorio
    {
        //debemos pasar la referencia del aplicationDBcontext al repositorio padre
        private readonly ApplicationDbContext _context;

        //base(context) por medio de esto, envío la informacion al repositorio padre
        public MarcaRepositorio(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public void Actualizar(MMarca mmarca)
        {
            //capturamos la informacion del registro actual, antes de actualizar
            var MarcaDB = _context.Marcas.FirstOrDefault(b => b.Id == mmarca.Id);
            if (MarcaDB != null)
            {
                MarcaDB.Nombre = mmarca.Nombre;
                MarcaDB.Estado = mmarca.Estado;
                MarcaDB.FechaModificacion = mmarca.FechaModificacion;
                //guardamos la informacion que tiene el modelo en la base de datos
                _context.SaveChanges();
            }
        }
    }
}
