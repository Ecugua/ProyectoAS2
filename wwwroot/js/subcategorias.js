document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de subcategorías iniciales
    let subcategorias = [
        { id: 1, categoriaId: 1, descripcion: "Gaming", estado: "Activo", creado: "2024-01-01", modificado: "2024-01-10" },
        { id: 2, categoriaId: 2, descripcion: "Accesorios PC", estado: "Activo", creado: "2024-02-01", modificado: "2024-02-05" },
        { id: 3, categoriaId: 3, descripcion: "Línea Blanca", estado: "Inactivo", creado: "2024-03-01", modificado: "2024-03-10" }
    ];

    // Inicializar DataTable
    const tablaSubcategorias = $('#tablaSubcategorias').DataTable({
        data: subcategorias,
        columns: [
            { data: 'id' },
            { data: 'categoriaId' },
            { data: 'descripcion' },
            { data: 'estado' },
            { data: 'creado' },
            { data: 'modificado' },
            {
                data: null,
                render: (data, type, row) => `
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${row.id}">Editar</button>
                    <button class="btn btn-danger btn-sm btn-desactivar" data-id="${row.id}">${row.estado === "Activo" ? "Desactivar" : "Activar"}</button>
                `
            }
        ]
    });

    // Limpiar inputs al abrir el modal de agregar subcategoría
    $('#agregarSubcategoriaModal').on('show.bs.modal', () => {
        $('#formAgregarSubcategoria')[0].reset();
    });

    // Agregar subcategoría con notificación
    $('#formAgregarSubcategoria').on('submit', function (e) {
        e.preventDefault();
        const nuevaSubcategoria = {
            id: Date.now(),
            categoriaId: parseInt($('#categoriaIdAgregar').val()),
            descripcion: $('#descripcionAgregar').val(),
            estado: $('#estadoAgregar').val(),
            creado: new Date().toISOString().split('T')[0],
            modificado: new Date().toISOString().split('T')[0]
        };
        subcategorias.push(nuevaSubcategoria);
        tablaSubcategorias.row.add(nuevaSubcategoria).draw();
        bootstrap.Modal.getInstance(document.getElementById('agregarSubcategoriaModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Subcategoría agregada con éxito',
            confirmButtonText: 'Aceptar'
        });
    });

    // Desactivar/activar subcategoría
    $('#tablaSubcategorias tbody').on('click', '.btn-desactivar', function () {
        const id = $(this).data('id');
        const subcategoria = subcategorias.find(s => s.id === id);
        const nuevoEstado = subcategoria.estado === "Activo" ? "Inactivo" : "Activo";

        Swal.fire({
            title: `¿Estás seguro de ${nuevoEstado === "Inactivo" ? "desactivar" : "activar"} esta subcategoría?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                subcategoria.estado = nuevoEstado;
                subcategoria.modificado = new Date().toISOString().split('T')[0];
                tablaSubcategorias.clear().rows.add(subcategorias).draw();

                Swal.fire({
                    icon: 'success',
                    title: `Subcategoría ${nuevoEstado === "Inactivo" ? "desactivada" : "activada"} con éxito`,
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });

    // Abrir modal de edición con datos precargados
    $('#tablaSubcategorias tbody').on('click', '.btn-editar', function () {
        const id = $(this).data('id');
        const subcategoria = subcategorias.find(s => s.id === id);

        // Precargar los datos en el formulario de edición
        $('#subcategoriaIdEditar').val(subcategoria.id);
        $('#categoriaIdEditar').val(subcategoria.categoriaId);
        $('#descripcionEditar').val(subcategoria.descripcion);
        $('#estadoEditar').val(subcategoria.estado);

        // Mostrar el modal de edición
        const modal = new bootstrap.Modal(document.getElementById('editarSubcategoriaModal'));
        modal.show();
    });

    // Guardar cambios de la subcategoría editada
    $('#formEditarSubcategoria').on('submit', function (e) {
        e.preventDefault();
        const id = parseInt($('#subcategoriaIdEditar').val());

        // Encontrar y actualizar los datos
        const subcategoria = subcategorias.find(s => s.id === id);
        subcategoria.categoriaId = parseInt($('#categoriaIdEditar').val());
        subcategoria.descripcion = $('#descripcionEditar').val();
        subcategoria.estado = $('#estadoEditar').val();
        subcategoria.modificado = new Date().toISOString().split('T')[0];

        // Actualizar la tabla y cerrar el modal
        tablaSubcategorias.clear().rows.add(subcategorias).draw();
        bootstrap.Modal.getInstance(document.getElementById('editarSubcategoriaModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Subcategoría editada con éxito',
            confirmButtonText: 'Aceptar'
        });
    });
});
