document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de marcas iniciales
    let marcas = [];

    // Fetch initial data from API and populate DataTable
    fetch('/Marca/obtenertodos')
        .then(response => response.json())
        .then(data => {
            marcas = data.data.map(item => ({
                id: item.id,
                descripcion: item.nombre,
                estado: item.estado ? "Activo" : "Inactivo",
                creado: item.fechaCreacion.split('T')[0],
                modificado: item.fechaModificacion ? item.fechaModificacion.split('T')[0] : "N/A"
            }));
            tablaMarcas.clear().rows.add(marcas).draw();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar datos',
                text: 'No se pudieron cargar los datos de las marcas.'
            });
        });

    // Inicializar DataTable
    const tablaMarcas = $('#tablaMarcas').DataTable({
        data: marcas,
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
                            <a href="/Marca/Upsert/${data}" class="btn btn-success text-white" style="cursor:pointer">
                                <i class="bi bi-pencil"></i>
                            </a>

                            <a onclick=Delete("/Marca/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer ">
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

