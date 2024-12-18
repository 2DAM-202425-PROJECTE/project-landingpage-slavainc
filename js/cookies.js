document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookie-banner");

    if (cookieBanner) {
        if (!document.cookie.includes("cookieConsent=")) {
            cookieBanner.style.display = "block"; // Mostra el banner
        }

        const acceptBtn = document.getElementById("acceptar");
        const rejectBtn = document.getElementById("rebutjar");
        const closeBtn = document.getElementById("tancar");

        if (acceptBtn) {
            acceptBtn.addEventListener("click", function() {
                setCookie("cookieConsent", "accepted");
                setSessionID(); // Assignar un ID de sessió
                cookieBanner.style.display = "none"; // Amaga el banner
            });
        }

        if (rejectBtn) {
            rejectBtn.addEventListener("click", function() {
                setCookie("cookieConsent", "rejected");
                cookieBanner.style.display = "none"; // Amaga el banner
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", function() {
                cookieBanner.style.display = "none"; // Amaga el banner
            });
        }
    }
});

function setCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // Expira en 30 dies
    const expires = "expires=" + date.toUTCString();
    const secure = location.protocol === "https:" ? "Secure;" : "";
    document.cookie = `${name}=${value};${expires};path=/;${secure}SameSite=Lax`;
}

function setSessionID() {
    const sessionID = 'sess_' + new Date().getTime(); // Genera un ID de sessió únic
    setCookie("sessionID", sessionID); // Assigna la cookie amb el sessionID
}
