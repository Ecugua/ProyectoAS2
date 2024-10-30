using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoASll.Models
{
    public class MCotizacion
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "El EmpleadoId es requerido")]
        public string EmpleadoId { get; set; } 
        [ForeignKey("EmpleadoId")] // Relación con Empleado
        public virtual MEmpleado Empleado { get; set; }

        [Required(ErrorMessage = "El ClienteId es requerido")]
        public int ClienteId { get; set; } 
        [ForeignKey("ClienteId")] // Relación con Cliente
        public MCliente Cliente { get; set; }

        public DateTime Fecha { get; set; }

        [Required(ErrorMessage = "El total es requerido")]
        [Column(TypeName = "decimal(18,2)")] // Asegurarse de que se configure como decimal
        public decimal Total { get; set; }
    }
}
