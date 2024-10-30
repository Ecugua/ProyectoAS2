using Microsoft.AspNetCore.Mvc.Rendering;
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
    public class SubCategoriaRepositorio : Repositorio<MSubCategoria>, ISubCategoriaRepositorio
    {
        //debemos pasar la referencia del aplicationDBcontzt al repositorio padre
        private readonly ApplicationDbContext _context;

        //base(context) por medio de esto, envío la informacion al repositorio padre
        public SubCategoriaRepositorio(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public void Actualizar(MSubCategoria msubcategoria)
        {
            //capturamos la informacion del registro actual, antes de actualizar
            var subcategoriaDB = _context.SubCategorias.FirstOrDefault(b => b.Id == msubcategoria.Id);
            if (subcategoriaDB != null)
            {
                subcategoriaDB.Nombre = msubcategoria.Nombre;
                subcategoriaDB.Estado = msubcategoria.Estado;
                subcategoriaDB.FechaModificacion = msubcategoria.FechaModificacion;
                subcategoriaDB.CategoriaId = msubcategoria.CategoriaId;
                //guardamos la informacion que tiene el modelo en la base de datos
                _context.SaveChanges();
            }
        }
        //metodo llena la lista con los elementos categoria o marcas
        public IEnumerable<SelectListItem> ObtenerTodosLista(string obj)
        {
            if (obj == "Categoria")
            {
                return _context.Categorias.Select(c => new SelectListItem
                {
                    Text = c.Nombre,
                    Value = c.Id.ToString()
                });
            }
            return null;
        }
    }
}
