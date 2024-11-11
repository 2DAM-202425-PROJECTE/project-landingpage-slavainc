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

// Selecciona tots els elements que tenen l'atribut data-toggle
document.querySelectorAll("[data-toggle]").forEach(item => {
    // Afegeix un event listener per gestionar el clic
    item.addEventListener("click", function() {
        // Selecciona el paràgraf amb el text de la resposta (el proper element <p> després de l'element actual)
        const answer = item.nextElementSibling;
        const icon = item.querySelector(".toggle-icon");

        // Alterna la visibilitat de la resposta
        answer.classList.toggle("hidden");

        // Canvia el símbol de + a - o viceversa
        if (answer.classList.contains("hidden")) {
            icon.textContent = "+";
        } else {
            icon.textContent = "-";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Inicializa EmailJS con tu Public Key
    emailjs.init("OBqXgrR0fs5ostHMu");

    // Selecciona el formulario y añade un manejador de eventos para el envío
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();  // Evita el comportamiento predeterminado de envío del formulario

        const userEmail = document.getElementById("email").value;

        // Muestra mensaje de estado
        let statusMessage = document.getElementById("statusMessage");
        if (!statusMessage) {
            statusMessage = document.createElement("p");
            statusMessage.id = "statusMessage";
            document.getElementById("contactForm").appendChild(statusMessage);
        }
        statusMessage.textContent = "Enviant subscripció...";
        statusMessage.style.color = "gray";

        // Envía el correo de bienvenida al usuario
        emailjs.send("service_bfmkhjk", "template_wigev16", { user_email: userEmail })
            .then(
                function (response) {
                    statusMessage.textContent = "Subscripció exitosa!";
                    statusMessage.style.color = "green";

                    // Envía el correo de notificación al administrador
                    return emailjs.send("service_bfmkhjk", "template_k0siyva", { user_email: userEmail });
                }
            )
            .then(
                function (response) {
                    console.log("Notificación enviada al administrador:", response);
                },
                function (error) {
                    console.error("Error al notificar al administrador:", error);
                    statusMessage.textContent = "Error de xarxa. Torna-ho a intentar més tard.";
                    statusMessage.style.color = "red";
                }
            )
            .then(() => {
                // Guarda el correo en Google Sheets
                console.log("Guardando el correo en Google Sheets...");
                return fetch("https://script.google.com/macros/s/AKfycbyHnZDjMvWh-SMo5jpnW2rXMqo32OGaKP8gRX54CIUDOVmnDasnzyv88qJAcBje1gz5/exec", {  // Reemplaza "URL_DEL_WEB_APP" con la URL de tu Web App
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({ email: userEmail })
                });
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    console.log("Correo guardado en Google Sheets");
                } else {
                    console.error("Error al guardar en Google Sheets:", data);
                }
            })
            .catch(function (error) {
                console.error("Error en el proceso:", error);
                statusMessage.textContent = "Error de xarxa. Torna-ho a intentar més tard.";
                statusMessage.style.color = "red";
            });

        // Limpia el campo de entrada después del envío
        this.reset();
    });
});