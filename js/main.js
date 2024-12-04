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
    // Inicialitza EmailJS amb la teva Public Key
    emailjs.init("OBqXgrR0fs5ostHMu");

    // Selecciona el formulari i afegeix un gestor d'esdeveniments per a l'enviament
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();  // Evita el comportament predeterminat d'enviament del formulari

        const userEmail = document.getElementById("email").value;  // Obtén l'email introduït per l'usuari

        // Mostra un missatge d'estat per informar l'usuari
        let statusMessage = document.getElementById("statusMessage");
        if (!statusMessage) {
            statusMessage = document.createElement("p");  // Crea un element per mostrar l'estat si no existeix
            statusMessage.id = "statusMessage";
            document.getElementById("contactForm").appendChild(statusMessage);
        }
        statusMessage.textContent = "Enviant subscripció...";  // Missatge inicial mentre s'envia
        statusMessage.style.color = "gray";

        // Envia un correu de benvinguda a l'usuari
        emailjs.send("service_bfmkhjk", "template_wigev16", { user_email: userEmail })
            .then(
                function (response) {
                    statusMessage.textContent = "Subscripció exitosa!";  // Missatge de confirmació
                    statusMessage.style.color = "green";

                    // Envia una notificació al correu de l'administrador
                    return emailjs.send("service_bfmkhjk", "template_k0siyva", { user_email: userEmail });
                }
            )
            .then(
                function (response) {
                    console.log("Notificació enviada a l'administrador:", response);  // Registre al terminal si és exitós
                },
                function (error) {
                    console.error("Error al notificar l'administrador:", error);  // Registre en cas d'error
                    statusMessage.textContent = "Error de xarxa. Torna-ho a intentar més tard.";  // Missatge d'error
                    statusMessage.style.color = "red";
                }
            )
            .then(() => {
                // Desa el correu a Google Sheets
                console.log("Desant el correu a Google Sheets...");
                return fetch("https://script.google.com/macros/s/AKfycbyHnZDjMvWh-SMo5jpnW2rXMqo32OGaKP8gRX54CIUDOVmnDasnzyv88qJAcBje1gz5/exec", {  // Reemplaça aquesta URL amb la del teu Web App
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({ email: userEmail })  // Envia l'email com a paràmetre POST
                });
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    console.log("Correu desat a Google Sheets");  // Confirma si l'operació és exitosa
                } else {
                    console.error("Error al desar a Google Sheets:", data);  // Registre d'error si falla
                }
            })
            .catch(function (error) {
                console.error("Error en el procés:", error);  // Registre general d'errors
                statusMessage.textContent = "Error de xarxa. Torna-ho a intentar més tard.";  // Mostra un missatge d'error a l'usuari
                statusMessage.style.color = "red";
            });

        // Neteja el camp de correu després de l'enviament
        this.reset();
    });
});
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