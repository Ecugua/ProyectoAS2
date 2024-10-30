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
    public class ProductoRepositorio : Repositorio<MProducto>, IProductoRepositorio
    {
        //debemos pasar la referencia del aplicationDBcontzt al repositorio padre
        private readonly ApplicationDbContext _context;

        //base(context) por medio de esto, envío la informacion al repositorio padre
        public ProductoRepositorio(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public void Actualizar(MProducto mproducto)
        {
            //capturamos la informacion del registro actual, antes de actualizar
            var productoDB = _context.Productos.FirstOrDefault(b => b.Id == mproducto.Id);
            if (productoDB != null)
            {
                productoDB.Modelo = mproducto.Modelo;
                productoDB.NumeroSerie = mproducto.NumeroSerie;
                productoDB.ImagenURL = mproducto.ImagenURL;
                productoDB.Precio = mproducto.Precio;
                productoDB.Stock = mproducto.Stock;
                productoDB.SubCategoriaId = mproducto.SubCategoriaId;
                productoDB.MarcaId = mproducto.MarcaId;
                productoDB.Disponible = mproducto.Disponible;
                //guardamos la informacion que tiene el modelo en la base de datos
                _context.SaveChanges();
            }
        }
        //metodo llena la lista con los elementos categoria o marcas
        public IEnumerable<SelectListItem> ObtenerTodosLista(string obj)
        {
            if (obj == "SubCategoria")
            {
                return _context.Categorias.Select(c => new SelectListItem
                {
                    Text = c.Nombre,
                    Value = c.Id.ToString()
                });
            }
            if (obj == "Marca")
            {
                return _context.Marcas.Select(c => new SelectListItem
                {
                    Text = c.Nombre,
                    Value = c.Id.ToString()
                });
            }
            return null;
        }
    }
}
