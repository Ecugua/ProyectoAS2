document.addEventListener('DOMContentLoaded', () => {
    let subcategorias = [
        { id: 1, descripcion: "Gaming" },
        { id: 2, descripcion: "Accesorios PC" },
        { id: 3, descripcion: "Electrodomésticos" }
    ];

    let marcas = [
        { id: 1, nombre: "Asus" },
        { id: 2, nombre: "Logitech" },
        { id: 3, nombre: "Samsung" }
    ];

    let productos = [
        { 
            id: 1, modelo: "TUF Gaming", numeroSerie: "AS12345", imagenURL: "../resources/laptop.png", 
            precio: 1500, stock: 10, subcategoriaId: 1, marcaId: 1, disponible: "Sí", 
            estado: "Activo", creado: "2024-01-01", modificado: "2024-01-10" 
        }
    ];

    const tablaProductos = $('#tablaProductos').DataTable({
        data: productos,
        columns: [
            { data: 'id' },
            { data: 'modelo' },
            { data: 'numeroSerie' },
            {
                data: 'imagenURL',
                render: (data) => `<img src="${data}" alt="Imagen del Producto" style="width: 50px; height: 50px;">`
            },
            { data: 'precio' },
            { data: 'stock' },
            { data: 'subcategoriaId' },
            { data: 'marcaId' },
            { data: 'disponible' },
            { data: 'estado' },
            { data: 'creado' },
            { data: 'modificado' },
            {
                data: null,
                render: (data, type, row) => `
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${row.id}">
                        <i class="far fa-edit"></i>
                    </button>
                    <button class="btn btn-danger btn-sm btn-eliminar" data-id="${row.id}">
                        <i class="far fa-trash-alt"></i>
                    </button>
                `
            }
        ]
    });

    function cargarSelects() {
        subcategorias.forEach(subcategoria => {
            const option = `<option value="${subcategoria.id}">${subcategoria.descripcion}</option>`;
            $('#subcategoriaIdAgregar, #subcategoriaIdEditar').append(option);
        });

        marcas.forEach(marca => {
            const option = `<option value="${marca.id}">${marca.nombre}</option>`;
            $('#marcaIdAgregar, #marcaIdEditar').append(option);
        });
    }
    cargarSelects();

    // Agregar producto con imagen
    $('#formAgregarProducto').on('submit', function (e) {
        e.preventDefault();
        const imagenFile = document.getElementById('imagenAgregar').files[0];
        const imagenURL = URL.createObjectURL(imagenFile);

        const nuevoProducto = {
            id: Date.now(),
            modelo: $('#modeloAgregar').val(),
            numeroSerie: $('#numeroSerieAgregar').val(),
            imagenURL: imagenURL,
            precio: parseFloat($('#precioAgregar').val()),
            stock: parseInt($('#stockAgregar').val()),
            subcategoriaId: parseInt($('#subcategoriaIdAgregar').val()),
            marcaId: parseInt($('#marcaIdAgregar').val()),
            disponible: $('#disponibleAgregar').val(),
            estado: "Activo",
            creado: new Date().toISOString().split('T')[0],
            modificado: new Date().toISOString().split('T')[0]
        };
        productos.push(nuevoProducto);
        tablaProductos.row.add(nuevoProducto).draw();
        bootstrap.Modal.getInstance(document.getElementById('agregarProductoModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado con éxito',
            confirmButtonText: 'Aceptar'
        });
    });

    // Editar producto
    $('#tablaProductos tbody').on('click', '.btn-editar', function () {
        const id = $(this).data('id');
        const producto = productos.find(p => p.id === id);

        $('#productoIdEditar').val(producto.id);
        $('#modeloEditar').val(producto.modelo);
        $('#numeroSerieEditar').val(producto.numeroSerie);
        $('#imagenEditar').val(''); // Limpiar el campo de imagen
        $('#precioEditar').val(producto.precio);
        $('#stockEditar').val(producto.stock);
        $('#subcategoriaIdEditar').val(producto.subcategoriaId);
        $('#marcaIdEditar').val(producto.marcaId);
        $('#disponibleEditar').val(producto.disponible);

        const modal = new bootstrap.Modal(document.getElementById('editarProductoModal'));
        modal.show();
    });

    // Guardar cambios en producto editado
    $('#formEditarProducto').on('submit', function (e) {
        e.preventDefault();
        const id = parseInt($('#productoIdEditar').val());
        const producto = productos.find(p => p.id === id);

        const imagenFile = document.getElementById('imagenEditar').files[0];
        const imagenURL = imagenFile ? URL.createObjectURL(imagenFile) : producto.imagenURL;

        producto.modelo = $('#modeloEditar').val();
        producto.numeroSerie = $('#numeroSerieEditar').val();
        producto.imagenURL = imagenURL;
        producto.precio = parseFloat($('#precioEditar').val());
        producto.stock = parseInt($('#stockEditar').val());
        producto.subcategoriaId = parseInt($('#subcategoriaIdEditar').val());
        producto.marcaId = parseInt($('#marcaIdEditar').val());
        producto.disponible = $('#disponibleEditar').val();
        producto.modificado = new Date().toISOString().split('T')[0];

        tablaProductos.clear().rows.add(productos).draw();
        bootstrap.Modal.getInstance(document.getElementById('editarProductoModal')).hide();

        Swal.fire({
            icon: 'success',
            title: 'Producto editado con éxito',
            confirmButtonText: 'Aceptar'
        });
    });

    // Eliminar producto
    $('#tablaProductos tbody').on('click', '.btn-eliminar', function () {
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
                productos = productos.filter(p => p.id !== id);
                tablaProductos.clear().rows.add(productos).draw();

                Swal.fire({
                    icon: 'success',
                    title: 'Producto eliminado',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });
});
