document.addEventListener('DOMContentLoaded', () => {
    // Datos del cliente
    const cliente = {
        id: 1,
        nombre: "Juan",
        apellido: "Pérez",
        correo_electronico: "juan.perez@example.com",
        direccion: "Avenida Principal 123, Ciudad de Guatemala",
        telefono: "+502 1234 5678"
    };

    // Referencias al DOM
    const listaConfirmacion = document.querySelector('.lista-confirmacion');
    const subtotalElem = document.getElementById('subtotal');
    const shippingElem = document.getElementById('shipping');
    const taxElem = document.getElementById('tax');
    const totalElem = document.getElementById('total');

    // Mostrar datos del cliente
    document.getElementById('nombreCliente').textContent = `${cliente.nombre} ${cliente.apellido}`;
    document.getElementById('correoCliente').textContent = cliente.correo_electronico;
    document.getElementById('direccionCliente').textContent = cliente.direccion;
    document.getElementById('telefonoCliente').textContent = cliente.telefono;

    // Obtener carrito desde localStorage o inicializar vacío
    let carritoConfirmacion = JSON.parse(localStorage.getItem('carritoConfirmacion')) || [];

    // Función para renderizar los productos en la tabla
    function renderizarProductos() {
        listaConfirmacion.innerHTML = ''; // Limpiar tabla
        let subtotal = 0;

        carritoConfirmacion.forEach((producto, index) => {
            const costo = producto.precio.toFixed(2);
            const cantidad = producto.cantidad || 1; // Valor por defecto 1
            const subtotalProducto = (producto.precio * cantidad).toFixed(2);
            subtotal += parseFloat(subtotalProducto);

            const fila = `
                <tr>
                    <td><img src="${producto.imagen}" alt="${producto.nombre}" class="img-confirmacion"></td>
                    <td>${producto.nombre}</td>
                    <td>$${costo}</td>
                    <td>
                        <input type="number" min="1" value="${cantidad}" 
                        class="form-control cantidad-input" data-index="${index}">
                    </td>
                    <td>$${subtotalProducto}</td>
                    <td>
                        <button class="btn btn-outline-danger btn-sm eliminar-producto" data-index="${index}">×</button>
                    </td>
                </tr>
            `;
            listaConfirmacion.innerHTML += fila;
        });

        actualizarResumen(subtotal);
    }

    // Función para actualizar el resumen del carrito
    function actualizarResumen(subtotal) {
        const shipping = 21.00;
        const tax = 1.91;
        const total = subtotal + shipping + tax;

        subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
        shippingElem.textContent = `$${shipping.toFixed(2)}`;
        taxElem.textContent = `$${tax.toFixed(2)}`;
        totalElem.textContent = `$${total.toFixed(2)}`;
    }

    // Cambiar la cantidad de productos
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('cantidad-input')) {
            const index = e.target.getAttribute('data-index');
            const nuevaCantidad = parseInt(e.target.value);
            carritoConfirmacion[index].cantidad = nuevaCantidad;

            localStorage.setItem('carritoConfirmacion', JSON.stringify(carritoConfirmacion));
            renderizarProductos();
        }
    });

    // Eliminar producto del carrito
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-producto')) {
            const index = e.target.getAttribute('data-index');
            carritoConfirmacion.splice(index, 1);

            localStorage.setItem('carritoConfirmacion', JSON.stringify(carritoConfirmacion));
            renderizarProductos();
        }
    });

    // Enviar cotización y limpiar datos en todas las vistas
    document.getElementById('enviarCotizacion').addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: 'Cotización enviada con éxito',
            confirmButtonText: 'Aceptar',
        }).then(() => {
            // Eliminar datos de carrito en todas las vistas
            localStorage.removeItem('carritoConfirmacion');
            localStorage.removeItem('carrito'); // Eliminar carrito de catalogoView
            // Redirigir a la página principal
            window.location.href = "/pages/home.html";
        });
    });

    // Renderizar productos al cargar la página
    renderizarProductos();
});
