import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()


document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const scrollToTop = document.getElementById('scroll-to-top');

    // Funció per mostrar/ocultar la fletxa de tornar a dalt
    const toggleScrollToTopButton = () => {
        if (window.scrollY > 300) {
            scrollToTop.classList.remove('hidden');
        } else {
            scrollToTop.classList.add('hidden');
        }
    };

    // Mostrar/ocultar el menú
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            scrollToTop.classList.add('hidden'); // Desapareix la fletxa si el menú és visible

            // Canviar l'icona del botó
            const icon = menuToggle.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>'; // Icona de menú
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'; // Icona de X
            }
        });
    }

    // Afegir un event listener a cada enllaç del menú mòbil per tancar-lo quan es fa clic
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    if (mobileMenuLinks.length > 0) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden'); // Tanca el menú
                const icon = menuToggle.querySelector('svg'); // Canvia l'icona del botó
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>'; // Icona de menú
            });
        });
    }

    // Event listener per fer aparèixer la fletxa en fer scroll
    if (scrollToTop) {
        window.addEventListener('scroll', toggleScrollToTopButton);

        // Funció per tornar a dalt
        scrollToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('[data-toggle]').forEach(item => {
        item.addEventListener('click', () => {
            const content = item.nextElementSibling; // El següent element (la resposta)
            const icon = item.querySelector('.toggle-icon'); // L'ícona + o -

            if (content.classList.contains('max-h-0')) {
                content.classList.remove('max-h-0'); // Mostrar resposta
                icon.textContent = '-'; // Canviar símbol a -
            } else {
                content.classList.add('max-h-0'); // Ocultar resposta
                icon.textContent = '+'; // Canviar símbol a +
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Select all buttons
    const buttons = document.querySelectorAll(".animated-btn");

    buttons.forEach(button => {
        // Apply a smooth transition to the button
        button.style.transition = "all 0.4s ease-in-out"; // Smoother and slightly slower transition

        // On mouse enter
        button.addEventListener("mouseenter", function() {
            this.classList.add("bg-white", "text-white", "scale-105", "rotate-1"); // Softer scaling and rotation
        });

        // On mouse leave
        button.addEventListener("mouseleave", function() {
            this.classList.remove("bg-white", "scale-105", "rotate-1");
        });
    });
});

// JavaScript per fer l'animació d'entrada de les cartes
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    window.addEventListener('scroll', function () {
        const triggerBottom = window.innerHeight * 0.9; /* Millor visibilitat */
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    });
});

document.querySelectorAll('[data-toggle]').forEach(item => {
    item.addEventListener('click', () => {
        const content = item.nextElementSibling; // El següent element (la resposta)
        const icon = item.querySelector('.toggle-icon'); // L'ícona + o -

        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden'); // Mostrar resposta
            icon.textContent = '-'; // Canviar símbol a -
        } else {
            content.classList.add('hidden'); // Ocultar resposta
            icon.textContent = '+'; // Canviar símbol a +
        }
    });
});