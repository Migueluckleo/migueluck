document.addEventListener("DOMContentLoaded", function () {
    /** ================================
     * ✅ Fade In Animation (Soporte Móvil)
     * ================================ */
    const animatedElements = document.querySelectorAll(".animate-fade-in");

    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                fadeObserver.unobserve(entry.target); // Evita bucles
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }); // Mejor visibilidad en móviles

    animatedElements.forEach(element => fadeObserver.observe(element));

    /** ================================
     * ✅ Counter Animation (Se repite al ser visible)
     * ================================ */
    const counters = document.querySelectorAll(".counter");
    const counterSection = document.getElementById("counter-section");

    function updateCount(counter) {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 100;

        function animateCounter() {
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(animateCounter, 20);
            } else {
                counter.innerText = target;
            }
        }
        animateCounter();
    }

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    counter.innerText = "0";
                    updateCount(counter);
                });
            }
        });
    }, { threshold: 0.5 });

    if (counterSection) counterObserver.observe(counterSection);

});