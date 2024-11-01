document.addEventListener('DOMContentLoaded', () => {
    // Arreglo de marcas iniciales
    let clientes = [];

    // Fetch initial data from API and populate DataTable
    fetch('/Cliente/obtenertodos')
        .then(response => response.json())
        .then(data => {
            clientes = data.data.map(item => ({
                id: item.id,
                nombre: item.nombre,
                apellido: item.apellido,
                telefono: item.numero,
                email: item.correoElectronico,
                direccion: item.direccion
            }));
            tablaClientes.clear().rows.add(clientes).draw();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar datos',
                text: 'No se pudieron cargar los datos de los clientes.'
            });
        });
        // Inicializar DataTable
        const tablaClientes = $('#tablaClientes').DataTable({
            data: clientes,
            columns: [
                { data: 'id' },
                { data: 'nombre' },
                { data: 'apellido' },
                { data: 'telefono' },
                { data: 'email' },
                { data: 'direccion' },
                {
                    "data": "id",
                    "render": function (data) {
                        return `
                        <div class ="text-center">
                            <a href="/Cliente/Upsert/${data}" class="btn btn-success text-white" style="cursor:pointer">
                                <i class="bi bi-pencil"></i>
                            </a>

                            <a onclick=Delete("/Cliente/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer ">
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
        "title": "¿Esta seguro de eliminar el cliente?",
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