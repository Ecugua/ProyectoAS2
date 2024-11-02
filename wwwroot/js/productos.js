document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de productos iniciales
    let productos = [];

    // Fetch initial data from API and populate DataTable
    fetch('/Producto/obtenertodos')
        .then(response => response.json())
        .then(data => {
            productos = data.data.map(item => ({
                id: item.id,
                modelo: item.modelo,
                numeroSerie: item.numeroSerie,
                imagenURL: item.imagenURL ? `/img/${item.imagenURL}` : "/img/default.png", // Ruta correcta
                precio: item.precio,
                stock: item.stock,
                subcategoriaId: item.subCategoria ? item.subCategoria.nombre : "Sin subcategoría",
                marcaId: item.marca ? item.marca.nombre : "Sin marca",
                disponible: item.disponible ? "Disponible" : "No Disponible"
            }));
            tablaProductos.clear().rows.add(productos).draw();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar datos',
                text: 'No se pudieron cargar los datos de los productos.'
            });
        });

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
            {
                data: 'id',
                render: function (data) {
                    return `
                        <div class="text-center">
                            <a href="/Producto/Upsert/${data}" class="btn btn-success text-white" style="cursor:pointer">
                                <i class="bi bi-pencil"></i>
                            </a>
                            <a onclick=Delete("/Producto/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer">
                                <i class="bi bi-trash"></i>
                            </a>
                        </div>
                    `;
                }
            }
        ]
    });
});

function Delete(url) {
    swal({
        title: "¿Está seguro de eliminar el producto?",
        text: "Este registro no se podrá recuperar",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((borrar) => {
        if (borrar) {
            $.ajax({
                type: "POST",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        $('#tablaProductos').DataTable().ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}
