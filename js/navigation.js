// ✅ Definir las funciones ANTES de llamarlas
function setupNavbarBehavior() {
    console.log("Navbar behavior initialized.");
    // Aquí puedes agregar cualquier otra funcionalidad para la navbar
}

function setupMobileMenu() {
    console.log("Mobile menu initialized.");
    // Aquí puedes agregar la lógica del menú móvil
}

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

            // Asegurar que la función setupNavbarBehavior esté definida antes de llamarla
            if (typeof setupNavbarBehavior === "function") {
                setupNavbarBehavior();
            } else {
                console.warn("setupNavbarBehavior no está definida");
            }

            if (typeof setupMobileMenu === "function") {
                setupMobileMenu();
            } else {
                console.warn("setupMobileMenu no está definida");
            }

            // ✅ Mueve aquí la lógica del menú
            const menuButton = document.querySelector("#menu-button");
            const navMenu = document.querySelector("#nav-menu");
            const navList = document.querySelectorAll("#nav-menu li");

            if (menuButton && navMenu) {
                menuButton.addEventListener("click", () => {
                    navMenu.classList.remove("hidden", "animate-slide-out");
                    navMenu.classList.add("flex", "animate-slide-in");
                });
            } else {
                console.error("El menú no se encontró en el DOM.");
            }

            if (navList.length > 0) {
                navList.forEach((liElement) => {
                    liElement.addEventListener("click", () => {
                        if (window.innerWidth >= 1024) return;
                        navMenu.classList.add("animate-slide-out");
                        navMenu.classList.remove("animate-slide-in");
                    });
                });
            }

            navMenu.addEventListener("animationend", (event) => {
                if (event.animationName !== "slide-out") return;
                navMenu.classList.add("hidden");
                navMenu.classList.remove("flex");
            });

            window.addEventListener("resize", () => {
                if (window.innerWidth >= 1024) {
                    navMenu?.classList.remove("animate-slide-out", "animate-slide-in");
                }
            });
        })
        .catch(error => console.error("Error cargando la navbar:", error));
});
