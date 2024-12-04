import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

// HERO SECTION JS PARTICLES START
// Array per emmagatzemar les partícules
var particles = [];

// Seleccionem la secció "Hero"
var heroSection = document.querySelector("section"); // Obté la secció Hero
var heroHeight = heroSection.offsetHeight; // Alçada de la secció Hero
var heroWidth = heroSection.offsetWidth; // Amplada de la secció Hero

// Funció per afegir una nova partícula
function addParticle() {
    var size = Math.random() * 50 + 100; // Mida aleatòria entre 50 i 150 px
    particles.push({
        // Es generen les coordenades x i y perquè les partícules es mantinguin dins dels límits
        x: Math.random() * (heroWidth - size) / heroWidth,
        y: Math.random() * (heroHeight - size) / heroHeight,
        xVel: (Math.random() - 0.5) * 0.2, // Velocitat aleatòria en x
        yVel: (Math.random() - 0.5) * 0.2, // Velocitat aleatòria en y
        size: size, // Assigna la mida calculada
        color: "hsl(" + (Math.random() * 80 + 180) + ", 60%, 50%)", // Color aleatori
        blur: Math.random() * 10 + 5, // Quantitat de desenfocament
        opacity: Math.random() * 0.2 + 0.1 // Opacitat aleatòria
    });
}

// Funció per renderitzar les partícules
function render() {
    var elem = document.getElementById("container"); // Contenidor de les partícules
    elem.innerHTML = ""; // Neteja el contingut existent

    for (let i = 0; i < particles.length; i++) {
        // Crea un nou element per a cada partícula
        var newParticle = "<div class='blob' style='width:" + particles[i].size + "px; height:" + particles[i].size + "px; top:" + particles[i].y * heroHeight + "px; left:" + particles[i].x * heroWidth + "px; background:" + particles[i].color + "; filter: blur(" + particles[i].blur + "px); opacity:" + particles[i].opacity + ";'></div>";
        elem.innerHTML += newParticle; // Afegeix la partícula al contenidor
    }
}

// Funció per actualitzar les dades de les partícules
function dataUpdate() {
    // Limita el nombre màxim de partícules i ajusta la probabilitat d'aparició
    if (particles.length < 25 && Math.random() < 0.1) {
        addParticle(); // Afegeix una nova partícula
    }

    for (let i = 0; i < particles.length; i++) {
        // Actualitza la posició de cada partícula
        particles[i].x += particles[i].xVel / 80;
        particles[i].y += particles[i].yVel / 80;

        // Gestiona els rebots als límits inferior o superior
        if (particles[i].y * heroHeight > heroHeight - particles[i].size) {
            particles[i].yVel = -Math.abs(particles[i].yVel); // Rebot cap amunt
        }
        if (particles[i].y * heroHeight < 0) {
            particles[i].yVel = Math.abs(particles[i].yVel); // Rebot cap avall
        }

        // Gestiona els rebots als límits esquerre o dret
        if (particles[i].x * heroWidth > heroWidth - particles[i].size) {
            particles[i].xVel = -Math.abs(particles[i].xVel); // Rebot cap a l'esquerra
        }
        if (particles[i].x * heroWidth < 0) {
            particles[i].xVel = Math.abs(particles[i].xVel); // Rebot cap a la dreta
        }
    }
}

// Funció per animar cada fotograma
function frame() {
    dataUpdate(); // Actualitza les dades de les partícules
    render(); // Renderitza les partícules
    window.requestAnimationFrame(frame); // Solicita el següent fotograma
}

// Actualitza les dimensions de la secció Hero en redimensionar la finestra
window.addEventListener('resize', () => {
    heroHeight = heroSection.offsetHeight;
    heroWidth = heroSection.offsetWidth;
});

// Inicia l'animació
window.requestAnimationFrame(frame);
// HERO SECTION JS PARTICLES FINISH

// PREUS SECTION START
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona tots els botons
    const buttons = document.querySelectorAll(".animated-btn");

    buttons.forEach(button => {
        // Aplica una transició suau als botons
        button.style.transition = "all 0.4s ease-in-out";

        // Afegir efectes quan el ratolí entra al botó
        button.addEventListener("mouseenter", function() {
            this.classList.add("bg-white", "text-white", "scale-105", "rotate-1"); // Afegeix classes per estil i animació
        });

        // Treure els efectes quan el ratolí surt del botó
        button.addEventListener("mouseleave", function() {
            this.classList.remove("bg-white", "scale-105", "rotate-1"); // Elimina les classes aplicades anteriorment
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Selecciona totes les cartes
    const cards = document.querySelectorAll(".card");

    // Funció per verificar si les cartes són visibles
    function checkCardsVisibility() {
        const triggerBottom = window.innerHeight * 0.9; // Defineix el punt de visibilitat (90% de l'alçada de la finestra)

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top; // Obtén la posició superior de la carta
            if (cardTop < triggerBottom) {
                card.classList.add("visible"); // Afegeix una classe per mostrar la carta
                card.classList.remove("invisible", "opacity-0"); // Elimina classes d'invisibilitat
            }
        });
    }

    // Comprova la visibilitat de les cartes quan es carrega la pàgina
    checkCardsVisibility();

    // També comprova la visibilitat durant el desplaçament de la pàgina
    window.addEventListener("scroll", checkCardsVisibility);
});
// PREUS SECTION FINISH

// CONTACTE/NEWSLETTER SECTION START
document.addEventListener("DOMContentLoaded", function () {
    // Maneja los formularios por separado
    handleNewsletterForm();
    handleContactForm();
});

function handleNewsletterForm() {
    const form = document.getElementById("contactForm");
    if (!form) return; // Si el formulario no existe en esta página, salir

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Inicializa EmailJS con la clave correspondiente a la cuenta del newsletter
        emailjs.init("OBqXgrR0fs5ostHMu");

        const userEmail = document.getElementById("email").value;

        let statusMessage = document.getElementById("statusMessage");
        if (!statusMessage) {
            statusMessage = document.createElement("p");
            statusMessage.id = "statusMessage";
            form.appendChild(statusMessage);
        }
        statusMessage.textContent = "Enviant subscripció...";
        statusMessage.style.color = "gray";

        emailjs.send("service_bfmkhjk", "template_wigev16", { user_email: userEmail })
            .then(
                function (response) {
                    statusMessage.textContent = "Subscripció exitosa!";
                    statusMessage.style.color = "green";

                    return emailjs.send("service_bfmkhjk", "template_k0siyva", { user_email: userEmail });
                }
            )
            .then(() => {
                // Guarda el correo en Google Sheets solo para Newsletter
                return saveToGoogleSheets({ email: userEmail });
            })
            .then(() => {
                console.log("Correo guardado en Google Sheets");
            })
            .catch(function (error) {
                console.error("Error en el proceso:", error);
                statusMessage.textContent = "Error de xarxa. Torna-ho a intentar més tard.";
                statusMessage.style.color = "red";
            });

        form.reset();
    });
}

function handleContactForm() {
    const form = document.getElementById("contactFormNew");
    if (!form) return; // Si el formulario no existe en esta página, salir

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Inicializa EmailJS con la clave correspondiente a la cuenta del contacto
        emailjs.init("D48mKGGhGAU6GU9oB");

        const firstName = document.getElementById("contact_first_name").value;
        const lastName = document.getElementById("contact_last_name").value;
        const fullName = `${firstName} ${lastName}`;
        const userEmail = document.getElementById("contact_email").value;
        const phone = document.getElementById("contact_phone").value;
        const message = document.getElementById("contact_message").value;

        let statusMessage = document.getElementById("contactStatusMessage");
        if (!statusMessage) {
            statusMessage = document.createElement("p");
            statusMessage.id = "contactStatusMessage";
            form.appendChild(statusMessage);
        }
        statusMessage.textContent = "Enviant missatge...";
        statusMessage.style.color = "gray";

        emailjs.send("service_6v42f8t", "template_q2uwj6q", {
            to_name: "Mr. Romero",
            from_name: fullName,
            user_email: userEmail,
            user_phone: phone,
            message: message
        })
            .then(
                function (response) {
                    statusMessage.textContent = "Missatge enviat amb èxit!";
                    statusMessage.style.color = "green";
                    console.log("Missatge enviat:", response);
                }
            )
            .catch(function (error) {
                console.error("Error en el procés:", error);
                statusMessage.textContent = "Error de xarxa. Torna-ho a intentar més tard.";
                statusMessage.style.color = "red";
            });

        form.reset();
    });
}

function saveToGoogleSheets(data) { // Función para guardar datos en Google Sheets (Solo se usa para el Newsletter)
    const url = "https://script.google.com/macros/s/AKfycbyHnZDjMvWh-SMo5jpnW2rXMqo32OGaKP8gRX54CIUDOVmnDasnzyv88qJAcBje1gz5/exec"; // Reemplaza con tu URL

    console.log("Guardando en Google Sheets:", data); // Debugging: Verificar datos enviados
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al conectar con Google Sheets");
            }
            return response.json();
        })
        .then(data => {
            if (data.status !== "success") {
                throw new Error("Error en la respuesta de Google Sheets");
            }
        });
}
// CONTACTE/NEWSLETTER SECTION FINISH

// TEAM SECTION START
    // Afegir l'esdeveniment de clic per girar la targeta en dispositius tàctils
    const cardo = document.getElementById("cardo");
    const cardm = document.getElementById("cardm");
    const cardh = document.getElementById("cardh");
    const cardmr = document.getElementById("cardmr");

    cardo.addEventListener("click", function() {
        // Afegir o eliminar la classe per girar la targeta
        cardo.classList.toggle("rotate-180");
    });

    cardm.addEventListener("click", function() {
        // Afegir o eliminar la classe per girar la targeta
        cardm.classList.toggle("rotate-180");
    });

    cardh.addEventListener("click", function() {
        // Afegir o eliminar la classe per girar la targeta
        cardh.classList.toggle("rotate-180");
    });

    cardmr.addEventListener("click", function() {
        // Afegir o eliminar la classe per girar la targeta
        cardmr.classList.toggle("rotate-180");
    });
// TEAM SECTION FINISH