// JSON de productos con IDs
const productos = [
    { id: 1, nombre: "EX DISPLAY : MSI Pro 16", precio: 499.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 2, nombre: "EX DISPLAY : MSI Pro 17", precio: 599.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 3, nombre: "EX DISPLAY : MSI Gaming", precio: 799.00, stock: false, imagen: "/resources/laptop.png" },
    { id: 4, nombre: "EX DISPLAY : MSI Business", precio: 699.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 5, nombre: "EX DISPLAY : MSI Office", precio: 450.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 6, nombre: "Laptop HP Pavilion", precio: 650.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 7, nombre: "Laptop Acer Aspire", precio: 550.00, stock: false, imagen: "/resources/laptop.png" },
    { id: 8, nombre: "Lenovo ThinkPad", precio: 800.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 9, nombre: "Dell XPS 13", precio: 1200.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 10, nombre: "MacBook Pro", precio: 1500.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 11, nombre: "ASUS ROG Zephyrus", precio: 1700.00, stock: false, imagen: "/resources/laptop.png" },
    { id: 12, nombre: "Microsoft Surface", precio: 1300.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 13, nombre: "Razer Blade", precio: 2200.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 14, nombre: "HP EliteBook", precio: 1000.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 15, nombre: "Acer Nitro 5", precio: 900.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 16, nombre: "MSI Stealth 15", precio: 2000.00, stock: false, imagen: "/resources/laptop.png" },
    { id: 17, nombre: "Dell Inspiron", precio: 700.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 18, nombre: "ASUS TUF Gaming", precio: 1200.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 19, nombre: "Samsung Galaxy Book", precio: 1100.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 20, nombre: "LG Gram", precio: 1300.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 21, nombre: "MacBook Air", precio: 999.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 22, nombre: "Huawei MateBook", precio: 850.00, stock: false, imagen: "/resources/laptop.png" },
    { id: 23, nombre: "Google Pixelbook", precio: 1400.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 24, nombre: "Dell G5 15", precio: 950.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 25, nombre: "Lenovo Yoga", precio: 1250.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 26, nombre: "ASUS ZenBook", precio: 1100.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 27, nombre: "HP Spectre x360", precio: 1600.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 28, nombre: "Razer Blade Stealth", precio: 1800.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 29, nombre: "Alienware M15", precio: 2500.00, stock: false, imagen: "/resources/laptop.png" },
    { id: 30, nombre: "Acer Predator Helios", precio: 1900.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 31, nombre: "Microsoft Surface Book", precio: 2100.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 32, nombre: "Apple MacBook Pro 16", precio: 2700.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 33, nombre: "ASUS ROG Strix", precio: 1500.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 34, nombre: "HP Omen", precio: 1400.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 35, nombre: "Dell Latitude", precio: 1300.00, stock: false, imagen: "/resources/laptop.png" },
    { id: 36, nombre: "Lenovo Legion", precio: 1700.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 37, nombre: "Acer Swift", precio: 1100.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 38, nombre: "MSI Summit", precio: 1900.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 39, nombre: "Samsung Galaxy Chromebook", precio: 1200.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 40, nombre: "Huawei MateBook D", precio: 700.00, stock: false, imagen: "/resources/laptop.png" },
    { id: 41, nombre: "Google Pixelbook Go", precio: 999.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 42, nombre: "ASUS VivoBook", precio: 800.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 43, nombre: "HP Chromebook", precio: 300.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 44, nombre: "Dell Vostro", precio: 600.00, stock: true, imagen: "/resources/laptop.png" },
    { id: 45, nombre: "MacBook Pro M1", precio: 2000.00, stock: true, imagen: "/resources/laptop.png" }
];

// Variables globales
let productosPorPagina = 12;
let paginaActual = 1;

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

// Verificar que el carrito no sea "undefined" ni se reinicie
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
                <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
                <span class="producto-stock">${producto.stock ? 'En stock' : 'Agotado'}</span>
                <button class="btn-agregar" data-id="${producto.id}">
                    <i class="fas fa-plus"></i>
                </button>
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
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-carrito">
                <span>${producto.nombre} - Q${producto.precio.toFixed(2)}</span>
                <div class="acciones-carrito">
                    <button class="btn-quitar" data-index="${index}">Quitar</button>
                </div>
            </li>
        `;
        listaCarrito.innerHTML += itemCarrito;
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
        window.location.href = "/pages/cotizacion.html";
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

// Configurar paginación
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
    renderizarProductos(paginaActual);
    configurarPaginacion();
    actualizarCarrito();
});
