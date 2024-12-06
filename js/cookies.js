document.addEventListener('DOMContentLoaded', function () {
    // El teu codi aquí

    function setCookie(name, value) {
        const date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // Expira en 30 dies
        const expires = "expires=" + date.toUTCString();
        const secure = location.protocol === "https:" ? "Secure;" : "";
        document.cookie = `${name}=${value};${expires};path=/;${secure}SameSite=Lax`;
    }

    // Comprovar si la cookie de consentiment ja existeix
    if (!document.cookie.includes("cookieConsent=")) {
        document.getElementById("cookie-banner").style.display = "block"; // Mostra el banner
    }

    // Acceptar cookies
    document.getElementById("acceptar").onclick = function () {
        setCookie("cookieConsent", "accepted");
        setSessionID(); // Assignar un ID de sessió
        document.getElementById("cookie-banner").style.display = "none"; // Amaga el banner
    };

    // Rebutjar cookies
    document.getElementById("rebutjar").onclick = function () {
        setCookie("cookieConsent", "rejected");
        document.getElementById("cookie-banner").style.display = "none"; // Amaga el banner
    };

    // Tancar el banner sense guardar cap canvi
    document.getElementById("tancar").onclick = function () {
        document.getElementById("cookie-banner").style.display = "none"; // Amaga el banner
    };

    // Funció per establir un ID de sessió únic
    function setSessionID() {
        const sessionID = 'sess_' + new Date().getTime(); // Genera un ID de sessió únic
        setCookie("sessionID", sessionID); // Assigna la cookie amb el sessionID
    }
});
