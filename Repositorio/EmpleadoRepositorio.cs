using Microsoft.AspNetCore.Identity;
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
    public class EmpleadoRepositorio : Repositorio<MEmpleado>, IEmpleadoRepositorio
    {
        //debemos pasar la referencia del aplicationDBcontzt al repositorio padre
        private readonly ApplicationDbContext _context;
        //private readonly UserManager<IdentityUser> _userManager;

        // base(context) envía la información al repositorio padre
        public EmpleadoRepositorio(ApplicationDbContext context) : base(context)
        {
            _context = context;           
        }

        public void Actualizar(MEmpleado mempleado)
        {
            // Obtener el usuario actual usando el `userId` pasado como parámetro.
            var empleadoDB = _context.Empleado.FirstOrDefault(b => b.Id == mempleado.Id);
            if (empleadoDB != null)
            {
                // Actualizar los campos necesarios
                empleadoDB.Nombre = mempleado.Nombre;
                empleadoDB.Apellido = mempleado.Apellido;
                empleadoDB.Rol = mempleado.Rol;
                empleadoDB.ImagenURL = mempleado.ImagenURL;
                //guardamos la informacion que tiene el modelo en la base de datos
                _context.SaveChanges();
            }
        }
    }
}
