document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de marcas iniciales
    let categorias = [];

    // Fetch initial data from API and populate DataTable
    fetch('/Categoria/obtenertodos')
        .then(response => response.json())
        .then(data => {
            categorias = data.data.map(item => ({
                id: item.id,
                descripcion: item.nombre,
                estado: item.estado ? "Activo" : "Inactivo",
                creado: item.fechaCreacion.split('T')[0],
                modificado: item.fechaModificacion ? item.fechaModificacion.split('T')[0] : "N/A"
            }));
            tablaCategorias.clear().rows.add(categorias).draw();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar datos',
                text: 'No se pudieron cargar los datos de las categorias.'
            });
        });

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
                "data": "id",
                "render": function (data) {
                    return `
                        <div class ="text-center">
                            <a href="/Categoria/Upsert/${data}" class="btn btn-success text-white" style="cursor:pointer">
                                <i class="bi bi-pencil"></i>
                            </a>

                            <a onclick=Delete("/Categoria/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer ">
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
                        tablaMarcas.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    })
}