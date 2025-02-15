document.addEventListener("DOMContentLoaded", function () {
    /** ================================
     * ✅ Cargar Navbar Dinámicamente
     * ================================ */
    const navbarContainer = document.createElement("div");
    navbarContainer.id = "navbar-container";
    document.body.prepend(navbarContainer); // Agrega el contenedor antes del contenido principal

    fetch("src/components/navbar.html")
        .then(response => response.text())
        .then(html => {
            navbarContainer.innerHTML = html;
            setupNavbarBehavior(); // Activa el comportamiento de ocultar/mostrar la navbar
            setupMobileMenu(); // Activa el menú móvil después de cargar la navbar
        })
        .catch(error => console.error("Error cargando la navbar:", error));
})
