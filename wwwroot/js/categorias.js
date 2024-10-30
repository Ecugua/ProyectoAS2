document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de categorías iniciales
    let categorias = [
        { id: 1, descripcion: "Laptops", estado: "Activo", creado: "2024-01-01", modificado: "2024-01-10" },
        { id: 2, descripcion: "Accesorios", estado: "Activo", creado: "2024-02-01", modificado: "2024-02-05" },
        { id: 3, descripcion: "Electrodomésticos", estado: "Inactivo", creado: "2024-03-01", modificado: "2024-03-10" }
    ];

    // Inicializar DataTable
    const tablaCategorias = $('#tablaCategorias').DataTable({
        data: categorias,
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
                    <button class="btn btn-danger btn-sm btn-desactivar" data-id="${row.id}">${row.estado === "Activo" ? "Desactivar" : "Activar"}</button>
                `
            }
        ]
    });

    // Limpiar los inputs al abrir el modal de agregar categoría
    $('#agregarCategoriaModal').on('show.bs.modal', () => {
        $('#formAgregarCategoria')[0].reset();
    });

    // Agregar categoría con notificación de confirmación
    $('#formAgregarCategoria').on('submit', function (e) {
        e.preventDefault();
        const nuevaCategoria = {
            id: Date.now(),
            descripcion: $('#descripcionAgregar').val(),
            estado: $('#estadoAgregar').val(),
            creado: new Date().toISOString().split('T')[0],
            modificado: new Date().toISOString().split('T')[0]
        };
        categorias.push(nuevaCategoria);
        tablaCategorias.row.add(nuevaCategoria).draw();
        bootstrap.Modal.getInstance(document.getElementById('agregarCategoriaModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Categoría agregada con éxito',
            confirmButtonText: 'Aceptar'
        });
    });

    // Desactivar/activar categoría con confirmación
    $('#tablaCategorias tbody').on('click', '.btn-desactivar', function () {
        const id = $(this).data('id');
        const categoria = categorias.find(c => c.id === id);
        const nuevoEstado = categoria.estado === "Activo" ? "Inactivo" : "Activo";

        Swal.fire({
            title: `¿Estás seguro de ${nuevoEstado === "Inactivo" ? "desactivar" : "activar"} esta categoría?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                categoria.estado = nuevoEstado;
                categoria.modificado = new Date().toISOString().split('T')[0];
                tablaCategorias.clear().rows.add(categorias).draw();

                Swal.fire({
                    icon: 'success',
                    title: `Categoría ${nuevoEstado === "Inactivo" ? "desactivada" : "activada"} con éxito`,
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });

    // Abrir el modal de edición con datos precargados
    $('#tablaCategorias tbody').on('click', '.btn-editar', function () {
        const id = $(this).data('id');
        const categoria = categorias.find(c => c.id === id);

        // Precargar los datos en el formulario de edición
        $('#categoriaIdEditar').val(categoria.id);
        $('#descripcionEditar').val(categoria.descripcion);
        $('#estadoEditar').val(categoria.estado);

        // Mostrar el modal de edición
        const modal = new bootstrap.Modal(document.getElementById('editarCategoriaModal'));
        modal.show();
    });

    // Guardar cambios de la categoría editada
    $('#formEditarCategoria').on('submit', function (e) {
        e.preventDefault();
        const id = parseInt($('#categoriaIdEditar').val());

        // Encontrar y actualizar los datos de la categoría
        const categoria = categorias.find(c => c.id === id);
        categoria.descripcion = $('#descripcionEditar').val();
        categoria.estado = $('#estadoEditar').val();
        categoria.modificado = new Date().toISOString().split('T')[0];

        // Actualizar la tabla y cerrar el modal
        tablaCategorias.clear().rows.add(categorias).draw();
        bootstrap.Modal.getInstance(document.getElementById('editarCategoriaModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Categoría editada con éxito',
            confirmButtonText: 'Aceptar'
        });
    });
});
