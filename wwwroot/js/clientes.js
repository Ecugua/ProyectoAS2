document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de marcas iniciales
    let clientes = [];

    // Fetch initial data from API and populate DataTable
    fetch('https://localhost:7117/Cliente/obtenertodos')
        .then(response => response.json())
        .then(data => {
            clientes = data.data.map(item => ({
                nombre: item.nombre,
                apellido: item.apellido,
                telefono: item.numero,
                email: item.correoElectronico,
                direccion: item.direccion
            }));
            tablaClientes.clear().rows.add(clientes).draw();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar datos',
                text: 'No se pudieron cargar los datos de las categorias.'
            });
        });
        // Inicializar DataTable
        const tablaClientes = $('#tablaClientes').DataTable({
            data: clientes,
            columns: [
                { data: 'nombre' },
                { data: 'apellido' },
                { data: 'telefono' },
                { data: 'email' },
                { data: 'direccion' },
                {
                    data: null,
                    render: (data, type, row) => `
                        <button class="btn btn-warning btn-sm btn-editar" data-id="${row.id}">Editar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar" data-id="${row.id}">Eliminar</button>
                    `
                }
            ]
        });
    
        // Limpiar los inputs al abrir el modal de agregar cliente
        $('#agregarClienteModal').on('show.bs.modal', () => {
            $('#formAgregarCliente')[0].reset();
        });
    
        // Agregar cliente con notificación de confirmación
        $('#formAgregarCliente').on('submit', function (e) {
            e.preventDefault();
            const nuevoCliente = {
                id: Date.now(),
                nombre: $('#nombreAgregar').val(),
                apellido: $('#apellidoAgregar').val(),
                telefono: $('#telefonoAgregar').val(),
                email: $('#emailAgregar').val(),
                direccion: $('#direccionAgregar').val()
            };
            clientes.push(nuevoCliente);
            tablaClientes.row.add(nuevoCliente).draw();
            bootstrap.Modal.getInstance(document.getElementById('agregarClienteModal')).hide();
    
            Swal.fire({
                icon: 'success',
                title: 'Cliente agregado con éxito',
                confirmButtonText: 'Aceptar'
            });
        });
    
        // Eliminar cliente con confirmación
        $('#tablaClientes tbody').on('click', '.btn-eliminar', function () {
            const id = $(this).data('id');
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción no se puede deshacer',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    clientes = clientes.filter(cliente => cliente.id !== id);
                    tablaClientes.row($(this).parents('tr')).remove().draw();
    
                    Swal.fire({
                        icon: 'success',
                        title: 'Cliente eliminado',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        });
    
        // Abrir el modal de edición con datos precargados
        $('#tablaClientes tbody').on('click', '.btn-editar', function () {
            const id = $(this).data('id');
            const cliente = clientes.find(c => c.id === id);
    
            // Precargar los datos en el formulario de edición
            $('#clienteIdEditar').val(cliente.id);
            $('#nombreEditar').val(cliente.nombre);
            $('#apellidoEditar').val(cliente.apellido);
            $('#telefonoEditar').val(cliente.telefono);
            $('#emailEditar').val(cliente.email);
            $('#direccionEditar').val(cliente.direccion);
    
            // Mostrar el modal de edición
            const modal = new bootstrap.Modal(document.getElementById('editarClienteModal'));
            modal.show();
        });
    
        // Guardar cambios del cliente editado
        $('#formEditarCliente').on('submit', function (e) {
            e.preventDefault();
            const id = parseInt($('#clienteIdEditar').val());
    
            // Encontrar y actualizar los datos del cliente
            const cliente = clientes.find(c => c.id === id);
            cliente.nombre = $('#nombreEditar').val();
            cliente.apellido = $('#apellidoEditar').val();
            cliente.telefono = $('#telefonoEditar').val();
            cliente.email = $('#emailEditar').val();
            cliente.direccion = $('#direccionEditar').val();
    
            // Actualizar la tabla y cerrar el modal
            tablaClientes.clear().rows.add(clientes).draw();
            bootstrap.Modal.getInstance(document.getElementById('editarClienteModal')).hide();
    
            Swal.fire({
                icon: 'success',
                title: 'Cliente editado con éxito',
                confirmButtonText: 'Aceptar'
            });
        });
    });
    