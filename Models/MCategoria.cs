using System.ComponentModel.DataAnnotations;

namespace ProyectoASll.Models
{
    public class MCategoria
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        [MaxLength(60, ErrorMessage = "El nombre debe ser máximo de 60 caracteres")]
        public string Nombre { get; set; }

        public bool Estado { get; set; } = true;

        public DateTime? FechaCreacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
