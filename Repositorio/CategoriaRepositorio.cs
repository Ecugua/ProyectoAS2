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
    public class CategoriaRepositorio : Repositorio<MCategoria>, ICategoriaRepositorio
    {
        //debemos pasar la referencia del aplicationDBcontzt al repositorio padre
        private readonly ApplicationDbContext _context;

        //base(context) por medio de esto, envío la informacion al repositorio padre
        public CategoriaRepositorio(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public void Actualizar(MCategoria mcategoria)
        {
            //capturamos la informacion del registro actual, antes de actualizar
            var categoriaDB = _context.Categorias.FirstOrDefault(b => b.Id == mcategoria.Id);
            if (categoriaDB != null)
            {
                categoriaDB.Nombre = mcategoria.Nombre;
                categoriaDB.Estado = mcategoria.Estado;
                categoriaDB.FechaModificacion = mcategoria.FechaModificacion;
                //guardamos la informacion que tiene el modelo en la base de datos
                _context.SaveChanges();
            }
        }
    }
}
