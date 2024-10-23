document.addEventListener("DOMContentLoaded", function() {
    // Seleccionem tots els botons
    const buttons = document.querySelectorAll(".animated-btn");

    buttons.forEach(button => {
        // Quan passes el ratolí per damunt
        button.addEventListener("mouseenter", function() {
            this.classList.add("bg-purple-600", "text-white", "scale-110", "rotate-3"); // Afegeix les classes per canviar l'estil
            this.classList.remove("bg-white", "text-purple-600"); // Treu les classes antigues
        });

        // Quan treus el ratolí de sobre
        button.addEventListener("mouseleave", function() {
            this.classList.remove("bg-purple-600", "text-white", "scale-110", "rotate-3"); // Treu les classes d'animació
            this.classList.add("bg-white", "text-purple-600"); // Torna a posar les classes originals
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