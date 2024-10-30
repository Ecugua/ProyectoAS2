using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoASll.Models
{
    public class MSubCategoria
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        [MaxLength(60, ErrorMessage = "El nombre debe ser máximo de 60 caracteres")]
        public string Nombre { get; set; }

        public bool Estado { get; set; } = true;

        public DateTime? FechaCreacion { get; set; }

        public DateTime? FechaModificacion { get; set; }

        //propiedades para las relaciones entre los modelos y las tablas en la base de datos
        [Required(ErrorMessage = "La categoria es requerida")]
        public int CategoriaId { get; set; }
        //colocamos el modelo con el que esta relacioando
        [ForeignKey("CategoriaId")]
        public MCategoria Categoria { get; set; }
    }
}
