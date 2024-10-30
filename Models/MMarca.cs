using System.ComponentModel.DataAnnotations;

namespace ProyectoASll.Models
{
    public class MMarca
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        [MaxLength(100, ErrorMessage = "El nombre debe ser máximo de 100 caracteres")]
        public string Nombre { get; set; }

        public bool Estado { get; set; } = true;

        public DateTime? FechaCreacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
