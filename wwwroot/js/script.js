// Referencias a los elementos del DOM
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const menuBtn = document.getElementById('menuBtn');
const submenuInventarios = document.getElementById('submenuInventarios');
const submenuToggleInventarios = document.querySelector('[data-bs-toggle="collapse"]');

// Alternar el menú lateral
menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('open');
});

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.remove('open');
});

document.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }
});

sidebar.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Lógica del submenú de inventarios con Bootstrap Collapse
submenuToggleInventarios.addEventListener('click', (e) => {
    e.preventDefault(); // Evitar comportamiento por defecto
    const submenu = bootstrap.Collapse.getOrCreateInstance(submenuInventarios); // Crear instancia del colapso
    submenu.toggle(); // Alternar entre abrir y cerrar
});

// // Eventos para registrar cuando el submenú se abra o cierre
// submenuInventarios.addEventListener('show.bs.collapse', () => {
//     console.log('El submenú de Inventarios se ha abierto.');
// });

// submenuInventarios.addEventListener('hide.bs.collapse', () => {
//     console.log('El submenú de Inventarios se ha cerrado.');
// });
