document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de clientes
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
    