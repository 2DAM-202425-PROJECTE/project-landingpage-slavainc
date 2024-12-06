document.addEventListener("DOMContentLoaded", function() {
    // Obtenir l'element del banner de cookies
    const cookieBanner = document.getElementById("cookie-banner");

    // Si el banner existeix, procedir
    if (cookieBanner) {
        // Comprovar si la cookie de consentiment ja existeix
        if (!document.cookie.includes("cookieConsent=")) {
            cookieBanner.style.display = "block"; // Mostrar el banner
        }

        // Obtenir els botons per a acceptar, rebutjar i tancar
        const acceptBtn = document.getElementById("acceptar");
        const rejectBtn = document.getElementById("rebutjar");
        const closeBtn = document.getElementById("tancar");

        // Acceptar cookies
        if (acceptBtn) {
            acceptBtn.addEventListener("click", function() {
                setCookie("cookieConsent", "accepted");
                setSessionID(); // Assignar un ID de sessió
                cookieBanner.style.display = "none"; // Amagar el banner
            });
        }

        // Rebutjar cookies
        if (rejectBtn) {
            rejectBtn.addEventListener("click", function() {
                setCookie("cookieConsent", "rejected");
                cookieBanner.style.display = "none"; // Amagar el banner
            });
        }

        // Tancar el banner sense guardar cap canvi
        if (closeBtn) {
            closeBtn.addEventListener("click", function() {
                cookieBanner.style.display = "none"; // Amagar el banner
            });
        }
    }
});

// Funció per establir una cookie
function setCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // Expira en 30 dies
    const expires = "expires=" + date.toUTCString();
    const secure = location.protocol === "https:" ? "Secure;" : "";
    document.cookie = `${name}=${value};${expires};path=/;${secure}SameSite=Lax`;
}

// Funció per establir un ID de sessió únic
function setSessionID() {
    const sessionID = 'sess_' + new Date().getTime(); // Genera un ID de sessió únic
    setCookie("sessionID", sessionID); // Assigna la cookie amb el sessionID
}
