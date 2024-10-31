document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de marcas iniciales
    let subcategorias = [];

    // Fetch initial data from API and populate DataTable
    fetch('https://localhost:7117/SubCategoria/obtenertodos')
        .then(response => response.json())
        .then(data => {
            subcategorias = data.data.map(item => ({
                id: item.id,
                categoriaId: item.categoriaId,
                descripcion: item.nombre,
                estado: item.estado ? "Activo" : "Inactivo",
                creado: item.fechaCreacion.split('T')[0],
                modificado: item.fechaModificacion ? item.fechaModificacion.split('T')[0] : "N/A"
            }));
            tablaSubcategorias.clear().rows.add(subcategorias).draw();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar datos',
                text: 'No se pudieron cargar los datos de las subcategorias.'
            });
        });

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
