document.addEventListener('DOMContentLoaded', async () => {
    // URL para obtener datos de clientes
    const urlClientes = '/Cliente/obtenertodos'; // Reemplaza esto con la URL correcta de tu API

    // Referencias al DOM
    const listaConfirmacion = document.querySelector('.lista-confirmacion');
    const subtotalElem = document.getElementById('subtotal');
    const shippingElem = document.getElementById('shipping');
    const taxElem = document.getElementById('tax');
    const totalElem = document.getElementById('total');
    const nombreClienteElem = document.getElementById('nombreCliente');
    const correoClienteElem = document.getElementById('correoCliente');
    const direccionClienteElem = document.getElementById('direccionCliente');
    const telefonoClienteElem = document.getElementById('telefonoCliente');

    let carritoConfirmacion = JSON.parse(localStorage.getItem('carritoConfirmacion')) || [];
    let clienteSeleccionado = JSON.parse(localStorage.getItem('clienteSeleccionado')) || null;

    // Mostrar los datos del cliente seleccionado
    function renderizarCliente() {
        if (clienteSeleccionado) {
            nombreClienteElem.textContent = `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}`;
            correoClienteElem.textContent = clienteSeleccionado.correoElectronico;
            direccionClienteElem.textContent = clienteSeleccionado.direccion;
            telefonoClienteElem.textContent = clienteSeleccionado.numero;
        } else {
            nombreClienteElem.textContent = "";
            correoClienteElem.textContent = "";
            direccionClienteElem.textContent = "";
            telefonoClienteElem.textContent = "";
        }
    }

    // Renderizar los productos en la tabla de cotización
    function renderizarProductos() {
        listaConfirmacion.innerHTML = '';
        let subtotal = 0;

        carritoConfirmacion.forEach((producto, index) => {
            const costo = producto.precio.toFixed(2);
            const cantidad = producto.cantidad || 1; // Asignar 1 por defecto si es undefined
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

    // Actualizar el resumen
    function actualizarResumen(subtotal) {
        const shipping = 21.00;
        const tax = 1.91;
        const total = subtotal + shipping + tax;

        subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
        shippingElem.textContent = `$${shipping.toFixed(2)}`;
        taxElem.textContent = `$${tax.toFixed(2)}`;
        totalElem.textContent = `$${total.toFixed(2)}`;
    }

    // Evento para cambiar la cantidad de productos
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('cantidad-input')) {
            const index = e.target.getAttribute('data-index');
            const nuevaCantidad = parseInt(e.target.value);

            if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                carritoConfirmacion[index].cantidad = nuevaCantidad;
                localStorage.setItem('carritoConfirmacion', JSON.stringify(carritoConfirmacion));
                renderizarProductos();
            } else {
                e.target.value = carritoConfirmacion[index].cantidad || 1; // Restablece valor anterior si es inválido
            }
        }
    });

    // Funcionalidad para eliminar productos
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('eliminar-producto')) {
            const index = e.target.getAttribute('data-index');
            carritoConfirmacion.splice(index, 1);

            localStorage.setItem('carritoConfirmacion', JSON.stringify(carritoConfirmacion));
            renderizarProductos();
        }
    });

    // Configurar DataTable en el modal de clientes con datos obtenidos desde la URL
    async function cargarClientes() {
        try {
            const response = await fetch(urlClientes);
            const data = await response.json();
            const clientes = data.data;

            // Destruir instancia previa de DataTable si existe para evitar el error de re-inicialización
            if ($.fn.DataTable.isDataTable('#tablaClientesCotizacion')) {
                $('#tablaClientesCotizacion').DataTable().clear().destroy();
            }

            $('#tablaClientesCotizacion').DataTable({
                data: clientes,
                columns: [
                    { data: 'nombre' },
                    { data: 'apellido' },
                    { data: 'numero', title: 'Teléfono' },
                    { data: 'correoElectronico', title: 'Email' },
                    { data: 'direccion' },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return `<button class="btn btn-outline-primary btn-sm btn-seleccionar" data-id="${row.id}">
                                        <i class="fas fa-plus-circle"></i>
                                    </button>`;
                        }
                    }
                ],
                language: {
                    search: "Buscar cliente:",
                    lengthMenu: "Mostrar _MENU_ registros por página",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ clientes",
                    paginate: {
                        first: "Primero",
                        last: "Último",
                        next: "Siguiente",
                        previous: "Anterior"
                    }
                }
            });

            // Asignar evento de selección después de cargar los datos
            $('#tablaClientesCotizacion tbody').on('click', '.btn-seleccionar', function () {
                const id = $(this).data('id');
                clienteSeleccionado = clientes.find(cliente => cliente.id === id);

                localStorage.setItem('clienteSeleccionado', JSON.stringify(clienteSeleccionado));
                renderizarCliente();

                const modal = bootstrap.Modal.getInstance(document.getElementById('buscarClienteModal'));
                modal.hide();
            });

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Enviar cotización y mostrar modal de reporte
    document.getElementById('enviarCotizacion').addEventListener('click', () => {
        llenarReporte();

        const modalReporte = new bootstrap.Modal(document.getElementById('reporteModal'));
        modalReporte.show();
    });

    // Llenar datos del reporte
    function llenarReporte() {
        const cliente = JSON.parse(localStorage.getItem('clienteSeleccionado'));
        const productos = JSON.parse(localStorage.getItem('carritoConfirmacion')) || [];

        document.getElementById('clienteReporte').textContent = `${cliente.nombre} ${cliente.apellido}`;
        document.getElementById('direccionReporte').textContent = cliente.direccion;
        document.getElementById('emailReporte').textContent = cliente.correoElectronico;

        const tablaProductos = document.getElementById('tablaReporteProductos');
        tablaProductos.innerHTML = '';

        let total = 0;
        productos.forEach(producto => {
            const cantidad = producto.cantidad || 1; // Validar cantidad
            const subtotal = producto.precio * cantidad;
            total += subtotal;

            const fila = `<tr>
                                <td>${producto.nombre}</td>
                                <td>Q${producto.precio.toFixed(2)}</td>
                                <td>${cantidad}</td>
                                <td>Q${subtotal.toFixed(2)}</td>
                              </tr>`;
            tablaProductos.innerHTML += fila;
        });

        document.getElementById('totalReporte').textContent = `Q${total.toFixed(2)}`;
    }

    // Imprimir reporte
    document.getElementById('imprimirReporte').addEventListener('click', () => {
        const contenido = document.getElementById('reporteContenido').innerHTML;
        const ventana = window.open('', '_blank');
        ventana.document.write(`<html><head><title>Reporte</title></head><body>${contenido}</body></html>`);
        ventana.document.close();
        ventana.print();
    });

    // Enviar por correo (simulación)
    document.getElementById('enviarCorreo').addEventListener('click', () => {
        Swal.fire('Correo enviado', 'El reporte ha sido enviado por correo', 'success').then(() => {
            cerrarModalYRedirigir();
        });
    });

    // Cerrar modal y redirigir
    function cerrarModalYRedirigir() {
        const modal = bootstrap.Modal.getInstance(document.getElementById('reporteModal'));
        modal.hide();

        localStorage.clear();
        window.location.href = "/pages/home.html";
    }

    renderizarCliente();
    renderizarProductos();
    await cargarClientes(); // Cargar clientes al inicio
});
