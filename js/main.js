import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()

fetch('/project-landingpage-slavainc/components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });
fetch('/project-landingpage-slavainc/components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    });

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

    // Funció per verificar la visibilitat de les cartes
    function checkCardsVisibility() {
        const triggerBottom = window.innerHeight * 0.9; // Ajusta la visibilitat
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.classList.add('visible');
            }
        });
    }

    // Comprova la visibilitat de les cartes un cop carregada la pàgina
    checkCardsVisibility();

    // També comprova en cada desplaçament per assegurar que es mantenen visibles
    window.addEventListener('scroll', checkCardsVisibility);
});

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
        emailjs.init("bIKPnY1CSSjaAi1Cg");

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

        emailjs.send("service_ooptksk", "template_1q05rkf", {
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
                },
                function (error) {
                    statusMessage.textContent = "Error al enviar el missatge. Torna-ho a intentar més tard.";
                    statusMessage.style.color = "red";
                    console.error("Error al enviar el missatge:", error);
                }
            );

        form.reset();
    });
}

// TEAM SECTION
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
// TEAM SECTION