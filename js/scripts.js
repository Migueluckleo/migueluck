document.addEventListener("DOMContentLoaded", function () {
    /** ================================
     * ✅ Fade In Animation
     * ================================ */
    const animatedElements = document.querySelectorAll(".animate-fade-in");

    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                fadeObserver.unobserve(entry.target); // Solo se anima una vez
            }
        });
    }, { threshold: 0.3 });

    animatedElements.forEach(element => fadeObserver.observe(element));

    /** ================================
     * ✅ Counter Animation
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
    if (window.innerWidth <= 768) { // 🔥 Solo se ejecuta en dispositivos ≤ 768px
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
            document.body.style.overflowY = "hidden";
        }

        function unlockScroll() {
            document.body.style.overflowY = "auto";
        }

        function resetScrollBehavior() {
            currentCard = 0;
            isLocked = false;
            cards.forEach(card => card.classList.remove("active-card"));
        }

        // 🔥 Solo activa el auto-scroll en móviles
        window.addEventListener("scroll", () => {
            if (window.innerWidth > 768) return; // ✅ Bloqueo en desktop
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

        window.addEventListener("wheel", (event) => {
            if (!isLocked || isScrolling) return;
            isScrolling = true;
            setTimeout(() => { isScrolling = false; }, 700);

            if (event.deltaY > 0) {
                if (currentCard < cards.length - 1) {
                    cards[currentCard].classList.remove("active-card");
                    currentCard++;
                    cards[currentCard].classList.add("active-card");
                    updateProgressBar();
                } else {
                    unlockScroll();
                    isLocked = false;
                }
            } else if (event.deltaY < 0) {
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
        });

        updateProgressBar();
    }
});
