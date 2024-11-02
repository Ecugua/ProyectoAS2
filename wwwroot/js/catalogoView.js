// Variables globales
let productosPorPagina = 12;
let paginaActual = 1;
let productos = [];

// Aseguramos que se recupere el carrito desde localStorage o inicializamos uno vacío.
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Referencias a los elementos del DOM
const gridProductos = document.querySelector('.grid-productos');
const listaCarrito = document.querySelector('.lista-carrito');
const contadorCarrito = document.querySelector('.contador-carrito');
const carritoOverlay = document.querySelector('.carrito-overlay');
const btnVaciarCarrito = document.querySelector('.btn-vaciar-carrito');
const btnCarrito = document.querySelector('.btn-carrito');
const modalAgregarCarrito = document.getElementById('modalAgregarCarrito');

// Cargar productos desde el controlador con opción de filtro por categoriaId
async function cargarProductosDesdeAPI(categoriaId = null) {
    try {
        const url = categoriaId
            ? `/Catalogo/ObtenerProductosPorCategoria?categoriaId=${categoriaId}`
            : '/Catalogo/ObtenerTodos';

        const response = await fetch(url);
        const data = await response.json();

        productos = data.data.map(item => ({
            id: item.id,
            nombre: item.modelo,
            precio: item.precio,
            stock: item.stock,
            imagen: item.imagenURL.startsWith('/img/') ? item.imagenURL : `/img/${item.imagenURL}`,
            disponible: item.disponible,
            subCategoria: item.subCategoria ? item.subCategoria.nombre : "Sin subcategoría",
            marca: item.marca ? item.marca.nombre : "Sin marca"
        }));

        // Renderizar los productos en la primera página y configurar la paginación
        renderizarProductos(paginaActual);
        configurarPaginacion();
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error al cargar productos',
            text: 'No se pudieron cargar los productos desde el servidor.',
        });
    }
}

// Cargar el carrito desde localStorage
function cargarCarritoDesdeStorage() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        actualizarCarrito();
    }
}

// Asegurar que el contenedor de botones contenga ambos botones correctamente
const contenedorAcciones = document.createElement('div');
contenedorAcciones.classList.add('carrito-acciones');
carritoOverlay.appendChild(contenedorAcciones);

// Botón de Confirmación de Compra
const btnConfirmar = document.createElement('button');
btnConfirmar.textContent = 'Confirmar Compra';
btnConfirmar.classList.add('btn-confirmar');
btnConfirmar.addEventListener('click', confirmarCompra);
contenedorAcciones.appendChild(btnConfirmar);

// Mover el botón de vaciar carrito al contenedor correcto
contenedorAcciones.appendChild(btnVaciarCarrito);

// Función para abrir el modal con los detalles del producto
function mostrarDetalleProducto(producto) {
    const modalTitulo = document.getElementById('modalTitulo');
    const modalImagen = document.getElementById('modalImagen');
    const modalDescripcion = document.getElementById('modalDescripcion');
    const modalPrecio = document.getElementById('modalPrecio');

    productoSeleccionado = producto;

    modalTitulo.textContent = producto.nombre;
    modalImagen.src = producto.imagen;
    modalDescripcion.textContent = producto.descripcion || 'Sin descripción disponible';
    modalPrecio.textContent = `Q${producto.precio.toFixed(2)}`;

    const modal = new bootstrap.Modal(document.getElementById('detalleProductoModal'));
    modal.show();
}

// Evento del botón para agregar al carrito desde el modal
modalAgregarCarrito.addEventListener('click', () => {
    agregarAlCarrito(productoSeleccionado.id);

    const modal = bootstrap.Modal.getInstance(document.getElementById('detalleProductoModal'));
    modal.hide();

    carritoOverlay.classList.add('open');
});

// Renderizar productos en la página actual
function renderizarProductos(pagina) {
    gridProductos.innerHTML = '';
    const inicio = (pagina - 1) * productosPorPagina;
    const productosPagina = productos.slice(inicio, inicio + productosPorPagina);

    productosPagina.forEach(producto => {
        const productoHTML = `
            <div class="producto-tarjeta">
                <a href="#" class="detalle-producto" data-id="${producto.id}">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </a>
                <p class="producto-nombre">${producto.nombre}</p>
                <p class="producto-precio">Q${producto.precio.toFixed(2)}</p>
                <span class="producto-stock">${producto.stock ? 'En stock' : 'Agotado'}</span>
                <button class="btn-agregar" data-id="${producto.id}"><i class="fas fa-plus"></i></button>
            </div>
        `;
        gridProductos.innerHTML += productoHTML;
    });

    document.querySelectorAll('.detalle-producto').forEach(enlace => {
        enlace.addEventListener('click', (event) => {
            event.preventDefault();
            const productoId = enlace.getAttribute('data-id');
            const producto = productos.find(prod => prod.id == productoId);
            mostrarDetalleProducto(producto);
        });
    });

    document.querySelectorAll('.btn-agregar').forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.stopPropagation();
            agregarAlCarrito(boton.dataset.id);
            carritoOverlay.classList.add('open');
        });
    });

    actualizarConteoProductos(inicio + 1, Math.min(inicio + productosPorPagina, productos.length), productos.length);
}

// Agregar productos al carrito
function agregarAlCarrito(id) {
    const productoExistente = carrito.find(prod => prod.id == id);
    if (!productoExistente) {
        const producto = productos.find(prod => prod.id == id);
        carrito.push(producto);
        actualizarCarrito();
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Producto ya en el carrito',
            text: 'Este producto ya fue agregado.',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            showConfirmButton: false,
            toast: true,
            position: 'top-right',
        });
    }
}

// Actualizar el carrito y sincronizar con localStorage
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach((producto, index) => {
        const itemCarrito = `
            <li class="item-carrito">
                <input type="hidden" value="${producto.id}">                
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-carrito">
                <span>${producto.nombre} - Q${producto.precio.toFixed(2)}</span>
                <div class="acciones-carrito">
                    <button class="btn-quitar" data-index="${index}">Quitar</button>
                </div>
            </li>
        `;
        listaCarrito.innerHTML += itemCarrito;
        console.log(producto.id);
    });

    contadorCarrito.textContent = carrito.length;
    localStorage.setItem('carrito', JSON.stringify(carrito));

    document.querySelectorAll('.btn-quitar').forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.stopPropagation();
            quitarDelCarrito(boton.dataset.index);
        });
    });
}

// Quitar un producto del carrito
function quitarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Vaciar el carrito
btnVaciarCarrito.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

// Mostrar/ocultar carrito
btnCarrito.addEventListener('click', () => {
    carritoOverlay.classList.toggle('open');
});

// Cerrar carrito al hacer clic fuera de él
document.addEventListener('click', (event) => {
    if (!carritoOverlay.contains(event.target) && !btnCarrito.contains(event.target)) {
        carritoOverlay.classList.remove('open');
    }
});

// Confirmar compra y redirigir
function confirmarCompra() {
    if (carrito.length > 0) {
        localStorage.setItem('carritoConfirmacion', JSON.stringify(carrito));
        window.location.href = "/Cotizacion/Cotizacion";
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vacío',
            text: 'Agrega productos al carrito antes de confirmar.',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            showConfirmButton: false,
            toast: true,
            position: 'top-right',
        });
    }
}

// Actualizar el conteo de productos
function actualizarConteoProductos(inicio, fin, total) {
    const infoProductos = document.querySelector('.informacion-productos p');
    if (infoProductos) {
        infoProductos.textContent = `Productos ${inicio}-${fin} de ${total}`;
    }
}

// Configurar la paginación
function configurarPaginacion() {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const paginacionContainer = document.querySelector('.paginacion');
    paginacionContainer.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        const boton = document.createElement('button');
        boton.classList.add('pagina-btn');
        if (i === paginaActual) boton.classList.add('active');
        boton.textContent = i;

        boton.addEventListener('click', () => {
            paginaActual = i;
            renderizarProductos(paginaActual);
            configurarPaginacion();
        });

        paginacionContainer.appendChild(boton);
    }
}

// Inicializar vista
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeStorage();
    const categoriaId = new URLSearchParams(window.location.search).get("categoriaId");
    cargarProductosDesdeAPI(categoriaId);
    actualizarCarrito();
});
