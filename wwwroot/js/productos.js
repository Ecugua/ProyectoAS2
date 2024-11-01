document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de marcas iniciales
    let productos = [];

    // Fetch initial data from API and populate DataTable
    fetch('/Producto/obtenertodos')
        .then(response => response.json())
        .then(data => {
            productos = data.data.map(item => ({
                id: item.id,
                modelo: item.modelo,
                numeroSerie: item.numeroSerie,
                imagenURL: "/img/" + item.imagenURL,
                precio: item.precio,
                stock: item.stock,
                subcategoriaId: item.subCategoria.id ? item.subCategoria.nombre : "Sin subcategoría", // Obtén el nombre de subcategoria
                marcaId: item.marca.id ? item.marca.nombre : "Sin marca", // Obtén el nombre de la marca
                disponible: item.disponible ? "Disponible" : "No Disponible",
                estado: item.estado ? "Activo" : "N/A",
                creado: item.fechaCreacion ? item.fechaCreacion.split('T')[0] : "N/A",
                modificado: item.fechaModificacion ? item.fechaModificacion.split('T')[0] : "N/A"
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
                "data": "id",
                "render": function (data) {
                    return `
                        <div class ="text-center">
                            <a href="/Producto/Upsert/${data}" class="btn btn-success text-white" style="cursor:pointer">
                                <i class="bi bi-pencil"></i>
                            </a>

                            <a onclick=Delete("/Producto/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer ">
                                <i class="bi bi-trash"></i>
                            </a>

                        </div>
                    `;
                },
            }
        ]
    });  
});
function Delete(url) {
    swal({
        "title": "¿Esta seguro de eliminar la marca?",
        "text": "Este registro no se podra recuperar",
        "icon": "warning",
        "buttons": true,
        "dangerMode": true
    }).then((borrar) => {
        if (borrar) {
            $.ajax({
                type: "POST",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        tablaSubcategorias.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    })
}