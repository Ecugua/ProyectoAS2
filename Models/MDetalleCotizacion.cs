using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoASll.Models
{
    public class MDetalleCotizacion
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "La cotización es requerida")]
        public int CotizacionId { get; set; }
        [ForeignKey("CotizacionId")]
        public MCotizacion Cotizacion { get; set; }

        [Required(ErrorMessage = "El producto es requerido")]
        public int ProductoId { get; set; }
        [ForeignKey("ProductoId")]
        public MProducto Producto { get; set; }

        [Required(ErrorMessage = "La cantidad es requerida")]
        public int Cantidad { get; set; }

        [Required(ErrorMessage = "El precio es requerido")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Precio { get; set; }

        [Required(ErrorMessage = "El subtotal es requerido")]
        [Column(TypeName = "decimal(18,2)")]
        public decimal SubTotal { get; set; }
    }
}