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

const API_URL = 'https://api.sheetbest.com/sheets/bd1db17a-99ef-4486-b8c5-dbf1944f3a08';

// Loader
const loader = document.getElementById('loader');

function showLoader() {
  if (loader) loader.style.display = 'flex';
}

function hideLoader() {
  if (loader) loader.style.display = 'none';
}

// HOME - Mostrar posts recientes
const postsContainer = document.getElementById('posts-container');

if (postsContainer) {
  showLoader();

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      hideLoader();

      const sortedPosts = data.sort((a, b) => new Date(b['Fecha']) - new Date(a['Fecha']));
      const recentPosts = sortedPosts.slice(0, 3);

      recentPosts.forEach(post => {
        postsContainer.innerHTML += `
          <article class="bg-white rounded-xl shadow-md overflow-hidden">
            <a href="post.html?id=${post['ID']}">
              <img src="${post['Imagen Hero']}" alt="${post['Título']}" class="w-full h-48 object-cover">
              <div class="p-4">
                <h2 class="text-2xl font-bold mb-2">${post['Título']}</h2>
                <p class="text-gray-600 text-sm mb-4">${post['Fecha']} - ${post['Autor']}</p>
                <p class="text-gray-700">${post['Párrafo 1'].substring(0, 100)}...</p>
              </div>
            </a>
          </article>
        `;
      });
    })
    .catch(error => {
      hideLoader();
      console.error('Error al cargar los posts:', error);
    });
}

// POST - Mostrar contenido individual del post
const postHero = document.getElementById('post-hero');

if (postHero) {
  showLoader();

  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      hideLoader();

      const post = data.find(item => item['ID'] === postId);

      if (post) {
        document.getElementById('post-title').textContent = post['Título'];
        document.getElementById('post-author').textContent = post['Autor'];
        document.getElementById('post-date').textContent = post['Fecha'];
        postHero.style.backgroundImage = `url('${post['Imagen Hero']}')`;

        document.getElementById('subtitle-one').textContent = post['Subtítulo 1'];
        document.getElementById('post-paragraph-one').textContent = post['Párrafo 1'];

        const interBanner = document.getElementById('inter-banner');
        if (post['Inter Banner']) {
          interBanner.src = post['Inter Banner'];
        } else {
          interBanner.style.display = 'none';
        }

        const subtitleTwo = document.getElementById('subtitle-two');
        const paragraphTwo = document.getElementById('post-paragraph-two');

        if (post['Párrafo 2'] && post['Subtítulo 2']) {
          paragraphTwo.textContent = post['Párrafo 2'];
          subtitleTwo.textContent = post['Subtítulo 2'];
        } else {
          paragraphTwo.style.display = 'none';
          subtitleTwo.style.display = 'none';
        }

      } else {
        console.error('Post no encontrado');
        postHero.innerHTML = `<p class="text-2xl">Post no encontrado</p>`;
      }
    })
    .catch(error => {
      hideLoader();
      console.error('Error al cargar el post:', error);
    });
}
