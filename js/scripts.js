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

    /** ================================
     * ✅ Mobile Cards Navigation + Stepper (Solo en Mobile)
     * ================================ */
    function isMobile() {
        return window.innerWidth <= 768;
    }

    if (isMobile()) {
        const cards = document.querySelectorAll(".proposal-card");
        const progressDots = document.querySelectorAll(".progress-dot");
        const container = document.getElementById("value-proposal");
        const counterSection = document.getElementById("counter-section");

        let currentCard = 0;
        let isScrolling = false;
        let isLocked = false;

        function updateProgressBar() {
            progressDots.forEach((dot, index) => {
                dot.classList.toggle("bg-gray-800", index === currentCard);
                dot.classList.toggle("bg-gray-400", index !== currentCard);
            });
        }

        function isElementVisible(element) {
            const rect = element.getBoundingClientRect();
            return rect.top < window.innerHeight / 2 && rect.bottom > 0;
        }

        function scrollToElement(element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: "smooth",
            });
        }

        function lockScroll() {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overscrollBehavior = "contain";
        }

        function unlockScroll() {
            document.documentElement.style.overflow = "auto";
            document.body.style.overscrollBehavior = "auto";
        }

        function resetScrollBehavior() {
            currentCard = 0;
            isLocked = false;
            cards.forEach(card => card.classList.remove("active-card"));
        }

        window.addEventListener("scroll", () => {
            if (!isMobile()) return; // Bloquea en desktop
            if (isElementVisible(container) && !isLocked) {
                isLocked = true;
                scrollToElement(container);
                lockScroll();
                currentCard = 0;
                cards[currentCard].classList.add("active-card");
                updateProgressBar();
            } else if (!isElementVisible(container)) {
                unlockScroll();
                resetScrollBehavior();
            }
        });

        function handleScroll(event) {
            if (!isLocked || isScrolling) return;
            isScrolling = true;
            setTimeout(() => { isScrolling = false; }, 700);

            let direction = event.deltaY || event.touches?.[0]?.clientY;

            if (direction > 0) {
                // Scroll hacia abajo
                if (currentCard < cards.length - 1) {
                    cards[currentCard].classList.remove("active-card");
                    currentCard++;
                    cards[currentCard].classList.add("active-card");
                    updateProgressBar();
                } else {
                    unlockScroll();
                    isLocked = false;
                }
            } else {
                // Scroll hacia arriba
                if (currentCard > 0) {
                    cards[currentCard].classList.remove("active-card");
                    currentCard--;
                    cards[currentCard].classList.add("active-card");
                    updateProgressBar();
                } else {
                    unlockScroll();
                    isLocked = false;
                    setTimeout(() => scrollToElement(counterSection), 100);
                }
            }
        }

        window.addEventListener("wheel", handleScroll);
        window.addEventListener("touchmove", handleScroll, { passive: true });

        updateProgressBar();
    }
});
