document.addEventListener('DOMContentLoaded', () => {
    let categorias = [];
    let subcategorias = [];

    // Función para cargar las categorías desde una URL
    async function cargarCategorias() {
        try {
            const response = await fetch('https://example.com/api/categorias'); // Reemplaza con tu URL real
            categorias = await response.json();
            cargarCategoriasSelect();
        } catch (error) {
            console.error('Error al cargar categorías:', error);
        }
    }

    // Llenar los select con las categorías obtenidas
    function cargarCategoriasSelect() {
        const selectAgregar = document.getElementById('categoriaIdAgregar');
        const selectEditar = document.getElementById('categoriaIdEditar');

        categorias.forEach(categoria => {
            const option = `<option value="${categoria.id}">${categoria.descripcion}</option>`;
            selectAgregar.insertAdjacentHTML('beforeend', option);
            selectEditar.insertAdjacentHTML('beforeend', option);
        });
    }

    // Función para cargar las subcategorías desde una URL
    async function cargarSubcategorias() {
        try {
            const response = await fetch('https://example.com/api/subcategorias'); // Reemplaza con tu URL real
            subcategorias = await response.json();
            inicializarDataTable();
        } catch (error) {
            console.error('Error al cargar subcategorías:', error);
        }
    }

    // Inicializar DataTable con subcategorías
    function inicializarDataTable() {
        $('#tablaSubcategorias').DataTable({
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
    }

    // Eventos para agregar y editar subcategorías
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
        $('#tablaSubcategorias').DataTable().row.add(nuevaSubcategoria).draw();
        bootstrap.Modal.getInstance(document.getElementById('agregarSubcategoriaModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Subcategoría agregada con éxito',
            confirmButtonText: 'Aceptar'
        });
    });

    $('#tablaSubcategorias tbody').on('click', '.btn-editar', function () {
        const id = $(this).data('id');
        const subcategoria = subcategorias.find(s => s.id === id);

        $('#subcategoriaIdEditar').val(subcategoria.id);
        $('#categoriaIdEditar').val(subcategoria.categoriaId);
        $('#descripcionEditar').val(subcategoria.descripcion);
        $('#estadoEditar').val(subcategoria.estado);

        const modal = new bootstrap.Modal(document.getElementById('editarSubcategoriaModal'));
        modal.show();
    });

    $('#formEditarSubcategoria').on('submit', function (e) {
        e.preventDefault();
        const id = parseInt($('#subcategoriaIdEditar').val());
        const subcategoria = subcategorias.find(s => s.id === id);

        subcategoria.categoriaId = parseInt($('#categoriaIdEditar').val());
        subcategoria.descripcion = $('#descripcionEditar').val();
        subcategoria.estado = $('#estadoEditar').val();
        subcategoria.modificado = new Date().toISOString().split('T')[0];

        $('#tablaSubcategorias').DataTable().clear().rows.add(subcategorias).draw();
        bootstrap.Modal.getInstance(document.getElementById('editarSubcategoriaModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Subcategoría editada con éxito',
            confirmButtonText: 'Aceptar'
        });
    });

    // Cargar categorías y subcategorías al iniciar
    cargarCategorias();
    cargarSubcategorias();
});
