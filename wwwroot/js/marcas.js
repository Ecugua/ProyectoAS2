document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de marcas iniciales
    let marcas = [];

    // Fetch initial data from API and populate DataTable
    fetch('https://localhost:7117/Marca/obtenertodos')
        .then(response => response.json())
        .then(data => {
            marcas = data.data.map(item => ({
                id: item.id,
                descripcion: item.nombre,
                estado: item.estado ? "Activo" : "Inactivo",
                creado: item.fechaCreacion.split('T')[0],
                modificado: item.fechaModificacion ? item.fechaModificacion.split('T')[0] : "N/A"
            }));
            tablaMarcas.clear().rows.add(marcas).draw();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar datos',
                text: 'No se pudieron cargar los datos de las marcas.'
            });
        });

    // Inicializar DataTable
    const tablaMarcas = $('#tablaMarcas').DataTable({
        data: marcas,
        columns: [
            { data: 'id' },
            { data: 'descripcion' },
            { data: 'estado' },
            { data: 'creado' },
            { data: 'modificado' },
            {
                data: null,
                render: (data, type, row) => `
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${row.id}">Editar</button>
                    <button class="btn btn-danger btn-sm btn-desactivar" data-id="${row.id}">
                        ${row.estado === "Activo" ? "Desactivar" : "Activar"}
                    </button>
                `
            }
        ]
    });

    // Limpiar los inputs al abrir el modal de agregar marca
    $('#agregarMarcaModal').on('show.bs.modal', () => {
        $('#formAgregarMarca')[0].reset();
    });

    // Agregar marca con notificación de confirmación
    $('#formAgregarMarca').on('submit', function (e) {
        e.preventDefault();
        const nuevaMarca = {
            id: Date.now(),
            descripcion: $('#descripcionAgregar').val(),
            estado: $('#estadoAgregar').val(),
            creado: new Date().toISOString().split('T')[0],
            modificado: new Date().toISOString().split('T')[0]
        };
        marcas.push(nuevaMarca);
        tablaMarcas.row.add(nuevaMarca).draw();
        bootstrap.Modal.getInstance(document.getElementById('agregarMarcaModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Marca agregada con éxito',
            confirmButtonText: 'Aceptar'
        });
    });

    // Desactivar/activar marca con confirmación
    $('#tablaMarcas tbody').on('click', '.btn-desactivar', function () {
        const id = $(this).data('id');
        const marca = marcas.find(m => m.id === id);
        const nuevoEstado = marca.estado === "Activo" ? "Inactivo" : "Activo";

        Swal.fire({
            title: `¿Estás seguro de ${nuevoEstado === "Inactivo" ? "desactivar" : "activar"} esta marca?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                marca.estado = nuevoEstado;
                marca.modificado = new Date().toISOString().split('T')[0];
                tablaMarcas.clear().rows.add(marcas).draw();

                Swal.fire({
                    icon: 'success',
                    title: `Marca ${nuevoEstado === "Inactivo" ? "desactivada" : "activada"} con éxito`,
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });

    // Abrir el modal de edición con datos precargados
    $('#tablaMarcas tbody').on('click', '.btn-editar', function () {
        const id = $(this).data('id');
        const marca = marcas.find(m => m.id === id);

        // Precargar los datos en el formulario de edición
        $('#marcaIdEditar').val(marca.id);
        $('#descripcionEditar').val(marca.descripcion);
        $('#estadoEditar').val(marca.estado);

        // Mostrar el modal de edición
        const modal = new bootstrap.Modal(document.getElementById('editarMarcaModal'));
        modal.show();
    });

    // Guardar cambios de la marca editada
    $('#formEditarMarca').on('submit', function (e) {
        e.preventDefault();
        const id = parseInt($('#marcaIdEditar').val());

        // Encontrar y actualizar los datos de la marca
        const marca = marcas.find(m => m.id === id);
        marca.descripcion = $('#descripcionEditar').val();
        marca.estado = $('#estadoEditar').val();
        marca.modificado = new Date().toISOString().split('T')[0];

        // Actualizar la tabla y cerrar el modal
        tablaMarcas.clear().rows.add(marcas).draw();
        bootstrap.Modal.getInstance(document.getElementById('editarMarcaModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Marca editada con éxito',
            confirmButtonText: 'Aceptar'
        });
    });
});
