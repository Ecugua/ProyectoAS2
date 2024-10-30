document.addEventListener('DOMContentLoaded', () => {
    // Variable JSON que simula una base de datos de clientes
    const clientes = [
        { id: 1, nombre: "Juan", apellido: "Pérez", telefono: "+502 1234 5678", email: "juan.perez@example.com", direccion: "Avenida Principal 123" },
        { id: 2, nombre: "Ana", apellido: "Gómez", telefono: "+502 9876 5432", email: "ana.gomez@example.com", direccion: "Calle 45, Zona 10" },
        { id: 3, nombre: "Carlos", apellido: "López", telefono: "+502 8765 4321", email: "carlos.lopez@example.com", direccion: "Zona 1, Guatemala" },
        { id: 4, nombre: "Luis", apellido: "Ramírez", telefono: "+502 4567 8901", email: "luis.ramirez@example.com", direccion: "Colonia El Maestro" },
        { id: 5, nombre: "María", apellido: "Martínez", telefono: "+502 7890 1234", email: "maria.martinez@example.com", direccion: "Avenida Las Américas" },
        { id: 6, nombre: "Pedro", apellido: "Castillo", telefono: "+502 6543 2109", email: "pedro.castillo@example.com", direccion: "Calle Ancha, Zona 7" },
        { id: 7, nombre: "Sofía", apellido: "Morales", telefono: "+502 8901 2345", email: "sofia.morales@example.com", direccion: "Calle Real, Antigua Guatemala" },
        { id: 8, nombre: "Jorge", apellido: "Vargas", telefono: "+502 1122 3344", email: "jorge.vargas@example.com", direccion: "Zona 15, Vista Hermosa" },
        { id: 9, nombre: "Isabel", apellido: "Sánchez", telefono: "+502 5567 8901", email: "isabel.sanchez@example.com", direccion: "Calle Martí, Zona 6" },
        { id: 10, nombre: "Daniel", apellido: "Ortega", telefono: "+502 3234 5678", email: "daniel.ortega@example.com", direccion: "Zona 4, Ciudad de Guatemala" },
        { id: 11, nombre: "Karla", apellido: "Jiménez", telefono: "+502 8901 2234", email: "karla.jimenez@example.com", direccion: "Boulevard Liberación" },
        { id: 12, nombre: "Ricardo", apellido: "Salazar", telefono: "+502 6789 1234", email: "ricardo.salazar@example.com", direccion: "Zona 11, Las Charcas" },
        { id: 13, nombre: "Elena", apellido: "Méndez", telefono: "+502 3456 7890", email: "elena.mendez@example.com", direccion: "Carretera a El Salvador" },
        { id: 14, nombre: "Miguel", apellido: "Rojas", telefono: "+502 2234 5567", email: "miguel.rojas@example.com", direccion: "Zona 10, Cayalá" },
        { id: 15, nombre: "Patricia", apellido: "Domínguez", telefono: "+502 6678 9012", email: "patricia.dominguez@example.com", direccion: "Zona 14, Guatemala" },
        { id: 16, nombre: "Andrés", apellido: "García", telefono: "+502 3344 5567", email: "andres.garcia@example.com", direccion: "San Lucas Sacatepéquez" },
        { id: 17, nombre: "Laura", apellido: "Flores", telefono: "+502 2211 2233", email: "laura.flores@example.com", direccion: "Chimaltenango, Centro" },
        { id: 18, nombre: "Cristina", apellido: "Mora", telefono: "+502 9876 5433", email: "cristina.mora@example.com", direccion: "Ciudad San Cristóbal" },
        { id: 19, nombre: "David", apellido: "Pineda", telefono: "+502 7890 5678", email: "david.pineda@example.com", direccion: "Zona 12, Ciudad" },
        { id: 20, nombre: "Gabriela", apellido: "Navas", telefono: "+502 3345 6789", email: "gabriela.navas@example.com", direccion: "Villa Nueva" },
        { id: 21, nombre: "Julio", apellido: "Ruiz", telefono: "+502 5544 6677", email: "julio.ruiz@example.com", direccion: "Zona 13, Aurora" },
        { id: 22, nombre: "Teresa", apellido: "Aguilar", telefono: "+502 9988 7766", email: "teresa.aguilar@example.com", direccion: "San José Pinula" },
        { id: 23, nombre: "Carlos", apellido: "Mejía", telefono: "+502 1122 5566", email: "carlos.mejia@example.com", direccion: "Zona 8, Ciudad" },
        { id: 24, nombre: "Luz", apellido: "Vega", telefono: "+502 6655 4433", email: "luz.vega@example.com", direccion: "Zona 16, Guatemala" },
        { id: 25, nombre: "Enrique", apellido: "Herrera", telefono: "+502 8899 5567", email: "enrique.herrera@example.com", direccion: "Mixco" },
        { id: 26, nombre: "Verónica", apellido: "Molina", telefono: "+502 3322 6655", email: "veronica.molina@example.com", direccion: "Villa Canales" },
        { id: 27, nombre: "Esteban", apellido: "Chávez", telefono: "+502 5544 2211", email: "esteban.chavez@example.com", direccion: "Zona 9" },
        { id: 28, nombre: "Valeria", apellido: "Torres", telefono: "+502 4455 6677", email: "valeria.torres@example.com", direccion: "Amatitlán" },
        { id: 29, nombre: "Pablo", apellido: "Fuentes", telefono: "+502 5544 8899", email: "pablo.fuentes@example.com", direccion: "Zona 2, Ciudad" },
        { id: 30, nombre: "Luisa", apellido: "Romero", telefono: "+502 6644 3322", email: "luisa.romero@example.com", direccion: "Zona 6" },
        { id: 31, nombre: "Santiago", apellido: "Guzmán", telefono: "+502 9988 1122", email: "santiago.guzman@example.com", direccion: "Santa Catarina Pinula" },
        { id: 32, nombre: "Inés", apellido: "Martínez", telefono: "+502 4455 7788", email: "ines.martinez@example.com", direccion: "Guatemala City" },
        { id: 33, nombre: "Roberto", apellido: "Juárez", telefono: "+502 1122 9988", email: "roberto.juarez@example.com", direccion: "Zona 3" },
        { id: 34, nombre: "Marta", apellido: "Lemus", telefono: "+502 7788 1122", email: "marta.lemus@example.com", direccion: "Chiquimula" },
        { id: 35, nombre: "Edgar", apellido: "Orellana", telefono: "+502 6677 2233", email: "edgar.orellana@example.com", direccion: "Escuintla" },
        { id: 36, nombre: "Daniela", apellido: "Cruz", telefono: "+502 7788 3344", email: "daniela.cruz@example.com", direccion: "San Juan Sacatepéquez" },
        { id: 37, nombre: "Tomás", apellido: "Zamora", telefono: "+502 3344 5566", email: "tomas.zamora@example.com", direccion: "Zona 5" },
        { id: 38, nombre: "Gloria", apellido: "Monroy", telefono: "+502 9988 6677", email: "gloria.monroy@example.com", direccion: "Guatemala City" },
        { id: 39, nombre: "Diego", apellido: "Ramos", telefono: "+502 5566 7788", email: "diego.ramos@example.com", direccion: "Zona 10" },
        { id: 40, nombre: "Alejandra", apellido: "Quintana", telefono: "+502 4455 9988", email: "alejandra.quintana@example.com", direccion: "San Miguel Petapa" }
    ];

    
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
                correoClienteElem.textContent = clienteSeleccionado.email;
                direccionClienteElem.textContent = clienteSeleccionado.direccion;
                telefonoClienteElem.textContent = clienteSeleccionado.telefono;
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
                const cantidad = producto.cantidad || 1;
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
    
        // Funcionalidad para cambiar cantidad de productos
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('cantidad-input')) {
                const index = e.target.getAttribute('data-index');
                carritoConfirmacion[index].cantidad = parseInt(e.target.value);
    
                localStorage.setItem('carritoConfirmacion', JSON.stringify(carritoConfirmacion));
                renderizarProductos();
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
    
        // Configurar DataTable en el modal de clientes
        $('#tablaClientes').DataTable({
            data: clientes,
            columns: [
                { data: 'nombre' },
                { data: 'apellido' },
                { data: 'telefono' },
                { data: 'email' },
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
    
        // Seleccionar cliente desde el DataTable
        $('#tablaClientes tbody').on('click', '.btn-seleccionar', function () {
            const id = $(this).data('id');
            clienteSeleccionado = clientes.find(cliente => cliente.id === id);
    
            localStorage.setItem('clienteSeleccionado', JSON.stringify(clienteSeleccionado));
            renderizarCliente();
    
            const modal = bootstrap.Modal.getInstance(document.getElementById('buscarClienteModal'));
            modal.hide();
        });
    
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
            document.getElementById('emailReporte').textContent = cliente.email;
    
            const tablaProductos = document.getElementById('tablaReporteProductos');
            tablaProductos.innerHTML = '';
    
            let total = 0;
            productos.forEach(producto => {
                const subtotal = producto.precio * producto.cantidad;
                total += subtotal;
    
                const fila = `<tr>
                                <td>${producto.nombre}</td>
                                <td>Q${producto.precio.toFixed(2)}</td>
                                <td>${producto.cantidad}</td>
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
    });
    