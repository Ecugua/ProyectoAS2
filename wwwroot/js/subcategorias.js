document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de categorías para el select
    let categorias = [
        { id: 1, descripcion: "Laptops" },
        { id: 2, descripcion: "Accesorios" },
        { id: 3, descripcion: "Electrodomésticos" }
    ];

    // Arreglo de subcategorías iniciales
    let subcategorias = [
        { id: 1, categoriaId: 1, descripcion: "Gaming", estado: "Activo", creado: "2024-01-01", modificado: "2024-01-10" },
        { id: 2, categoriaId: 2, descripcion: "Accesorios PC", estado: "Activo", creado: "2024-02-01", modificado: "2024-02-05" }
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
                    <button class="btn btn-danger btn-sm btn-desactivar" data-id="${row.id}">
                        ${row.estado === "Activo" ? "Desactivar" : "Activar"}
                    </button>
                `
            }
        ]
    });

    // Llenar los select con categorías
    function cargarCategoriasSelect() {
        categorias.forEach(categoria => {
            const option = `<option value="${categoria.id}">${categoria.descripcion}</option>`;
            $('#categoriaIdAgregar, #categoriaIdEditar').append(option);
        });
    }
    cargarCategoriasSelect();

    // Agregar subcategoría
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

    // Editar subcategoría
    $('#tablaSubcategorias tbody').on('click', '.btn-editar', function () {
        const id = $(this).data('id');
        const subcategoria = subcategorias.find(s => s.id === id);

        // Precargar datos en el modal de edición
        $('#subcategoriaIdEditar').val(subcategoria.id);
        $('#categoriaIdEditar').val(subcategoria.categoriaId);
        $('#descripcionEditar').val(subcategoria.descripcion);
        $('#estadoEditar').val(subcategoria.estado);

        const modal = new bootstrap.Modal(document.getElementById('editarSubcategoriaModal'));
        modal.show();
    });

    // Guardar cambios en la subcategoría editada
    $('#formEditarSubcategoria').on('submit', function (e) {
        e.preventDefault();
        const id = parseInt($('#subcategoriaIdEditar').val());
        const subcategoria = subcategorias.find(s => s.id === id);

        // Actualizar los datos
        subcategoria.categoriaId = parseInt($('#categoriaIdEditar').val());
        subcategoria.descripcion = $('#descripcionEditar').val();
        subcategoria.estado = $('#estadoEditar').val();
        subcategoria.modificado = new Date().toISOString().split('T')[0];

        tablaSubcategorias.clear().rows.add(subcategorias).draw();
        bootstrap.Modal.getInstance(document.getElementById('editarSubcategoriaModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Subcategoría editada con éxito',
            confirmButtonText: 'Aceptar'
        });
    });
});
