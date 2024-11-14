import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()


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