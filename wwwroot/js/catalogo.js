// Obtener todos los dropdowns
const dropdowns = document.querySelectorAll('.dropdown-catalogo');

// Agregar eventos a cada botón de toggle
dropdowns.forEach(dropdown => {
    const toggleButton = dropdown.querySelector('.dropdown-toggle');
    const submenu = dropdown.querySelector('.submenu');

    toggleButton.addEventListener('click', () => {
        // Cerrar otros menús abiertos
        closeAllSubmenusExcept(submenu);

        // Alternar visibilidad del submenu
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    });
});

// Función para cerrar todos los submenús excepto el actual
function closeAllSubmenusExcept(currentSubmenu) {
    dropdowns.forEach(dropdown => {
        const submenu = dropdown.querySelector('.submenu');
        if (submenu !== currentSubmenu) {
            submenu.style.display = 'none';
        }
    });
}

// Cerrar submenús al hacer clic fuera de cualquier dropdown
window.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown-catalogo')) {
        closeAllSubmenusExcept(null);
    }
});
