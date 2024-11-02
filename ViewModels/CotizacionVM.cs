namespace ProyectoASll.ViewModels
{
    public class CotizacionVM
    {
        public int ClienteId { get; set; } // ID del cliente
        public List<DetalleCotizacionDto> Detalles { get; set; } // Lista de productos en la cotización

        public class DetalleCotizacionDto
        {
            public int ProductoId { get; set; } // ID del producto
            public int Cantidad { get; set; }   // Cantidad de cada producto
            public decimal Precio { get; set; }  // Precio unitario de cada producto
        }
    }
}
