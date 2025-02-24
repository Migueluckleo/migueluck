    /** ================================
     * ✅ typewriter effect
     * ================================ */

const words = ["Diseñemos excelentes páginas web", "Diseñemos aplicaciones impresionantes", "Construyamos experiencias memorables", "Innovemos juntos"];
let currentWordIndex = 0;
let currentText = "";
let isDeleting = false;
let charIndex = 0;
const speed = 100; // Velocidad de escritura
const delayBetweenWords = 1500; // Tiempo antes de borrar

const typewriterElement = document.getElementById("typewriter");

function typeEffect() {
    const word = words[currentWordIndex];

    if (isDeleting) {
        currentText = word.substring(0, charIndex--);
    } else {
        currentText = word.substring(0, charIndex++);
    }

    typewriterElement.textContent = currentText;

    let typingSpeed = speed;

    if (isDeleting) {
        typingSpeed /= 2; // Velocidad de borrado más rápida
    }

    if (!isDeleting && currentText === word) {
        typingSpeed = delayBetweenWords;
        isDeleting = true;
    } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length;
        typingSpeed = 500; // Pequeña pausa antes de escribir la siguiente palabra
    }

    setTimeout(typeEffect, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});

    /** ================================
     * ✅ next Script
     * ================================ */

    document.addEventListener('DOMContentLoaded', () => {
        const counters = document.querySelectorAll('.counter');
    
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
    
                const increment = target / 100; // Ajusta la velocidad de la animación
    
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20); // Controla la frecuencia de la animación
                } else {
                    counter.innerText = target;
                }
            };
    
            updateCount();
        });
    });
    