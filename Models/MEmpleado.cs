using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoASll.Models
{
    public class MEmpleado : IdentityUser
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        [MaxLength(60, ErrorMessage = "El nombre debe ser máximo de 60 caracteres")]
        public string Nombre { get; set; } 

        [Required(ErrorMessage = "El apellido es requerido")]
        [MaxLength(60, ErrorMessage = "El apellido debe ser máximo de 60 caracteres")]
        public string Apellido { get; set; }  

        [Required(ErrorMessage = "El rol es requerido")]
        [MaxLength(50, ErrorMessage = "El rol debe ser máximo de 50 caracteres")]
        public string Rol { get; set; }

        [Required(ErrorMessage = "El número es requerido")]
        [MaxLength(15, ErrorMessage = "El número debe ser máximo de 15 caracteres")]
        public string Numero { get; set; }

        [MaxLength(255, ErrorMessage = "El url de la imagen debe ser máximo de 255 caracteres")]
        public string ImagenURL { get; set; }

        public DateTime? FechaCreacion { get; set; } 

        public DateTime? FechaModificacion { get; set; }
    }
}
