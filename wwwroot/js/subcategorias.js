document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de marcas iniciales
    let subcategorias = [];

    // Fetch initial data from API and populate DataTable
    fetch('/SubCategoria/obtenertodos')
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
                "data": "id",
                "render": function (data) {
                    return `
                        <div class ="text-center">
                            <a href="/SubCategoria/Upsert/${data}" class="btn btn-success text-white" style="cursor:pointer">
                                <i class="bi bi-pencil"></i>
                            </a>

                            <a onclick=Delete("/SubCategoria/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer ">
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