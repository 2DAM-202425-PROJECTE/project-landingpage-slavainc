import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

// HERO SECTION JS PARTICLES START
var particles = [];
var heroSection = document.querySelector("section"); // Get Hero Section
var heroHeight = heroSection.offsetHeight; // Height of the Hero section
var heroWidth = heroSection.offsetWidth; // Width of the Hero section

function addParticle() {
    var size = Math.random() * 50 + 100; // Random size between 50 and 150px
    particles.push({
        // Generate x and y so particles stay fully within bounds
        x: Math.random() * (heroWidth - size) / heroWidth,
        y: Math.random() * (heroHeight - size) / heroHeight,
        xVel: (Math.random() - 0.5) * 0.2,
        yVel: (Math.random() - 0.5) * 0.2,
        size: size,
        color: "hsl(" + (Math.random() * 80 + 180) + ", 60%, 50%)",
        blur: Math.random() * 10 + 5,
        opacity: Math.random() * 0.2 + 0.1
    });
}

function render() {
    var elem = document.getElementById("container");
    elem.innerHTML = "";

    for (let i = 0; i < particles.length; i++) {
        var newParticle = "<div class='blob' style='width:" + particles[i].size + "px; height:" + particles[i].size + "px; top:" + particles[i].y * heroHeight + "px; left:" + particles[i].x * heroWidth + "px; background:" + particles[i].color + "; filter: blur(" + particles[i].blur + "px); opacity:" + particles[i].opacity + ";'></div>";
        elem.innerHTML += newParticle;
    }
}

function dataUpdate() {
    if (particles.length < 25 && Math.random() < 0.1) { // Reduced particle count limit and spawn rate
        addParticle();
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].xVel / 80;
        particles[i].y += particles[i].yVel / 80;

        // Bounce on bottom or top edges
        if (particles[i].y * heroHeight > heroHeight - particles[i].size) {
            particles[i].yVel = -Math.abs(particles[i].yVel); // Bounce up
        }
        if (particles[i].y * heroHeight < 0) {
            particles[i].yVel = Math.abs(particles[i].yVel); // Bounce down
        }

        // Bounce on left or right edges
        if (particles[i].x * heroWidth > heroWidth - particles[i].size) {
            particles[i].xVel = -Math.abs(particles[i].xVel); // Bounce left
        }
        if (particles[i].x * heroWidth < 0) {
            particles[i].xVel = Math.abs(particles[i].xVel); // Bounce right
        }
    }
}

function frame() {
    dataUpdate();
    render();
    window.requestAnimationFrame(frame);
}

window.addEventListener('resize', () => {
    heroHeight = heroSection.offsetHeight;
    heroWidth = heroSection.offsetWidth;
});

window.requestAnimationFrame(frame);

// HERO SECTION JS PARTICLES FINISH

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