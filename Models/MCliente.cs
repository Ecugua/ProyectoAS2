using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoASll.Models
{
    public class MCliente
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        [MaxLength(100, ErrorMessage = "El nombre debe ser máximo de 100 caracteres")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El apellido es requerido")]
        [MaxLength(100, ErrorMessage = "El apellido debe ser máximo de 100 caracteres")]
        public string Apellido { get; set; }

        [Required(ErrorMessage = "El correo es requerido")]
        [EmailAddress(ErrorMessage = "El correo electrónico no es válido")]
        public string CorreoElectronico { get; set; }

        [Required(ErrorMessage = "La dirección es requerida")]
        [MaxLength(255, ErrorMessage = "La dirección debe ser máximo de 255 caracteres")]
        public string Direccion { get; set; }

        [Required(ErrorMessage = "El número es requerido")]
        [MaxLength(15, ErrorMessage = "El número debe ser máximo de 15 caracteres")]
        public string Numero { get; set; }
    }
}
