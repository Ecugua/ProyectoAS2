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
    public class ClienteRepositorio : Repositorio<MCliente>, IClienteRepositorio
    {
        //debemos pasar la referencia del aplicationDBcontzt al repositorio padre
        private readonly ApplicationDbContext _context;

        //base(context) por medio de esto, envío la informacion al repositorio padre
        public ClienteRepositorio(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public void Actualizar(MCliente mcliente)
        {
            //capturamos la informacion del registro actual, antes de actualizar
            var clienteDB = _context.Clientes.FirstOrDefault(b => b.Id == mcliente.Id);
            if (clienteDB != null)
            {
                clienteDB.Nombre = mcliente.Nombre;
                clienteDB.Apellido = mcliente.Apellido;
                clienteDB.CorreoElectronico = mcliente.CorreoElectronico;
                clienteDB.Direccion = mcliente.Direccion;
                clienteDB.Numero = mcliente.Numero;
                //guardamos la informacion que tiene el modelo en la base de datos
                _context.SaveChanges();
            }
        }
    }
}
