function setCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Mostrar el banner de cookies si no hi ha res
if (!document.cookie.includes("cookieConsent=")) {
    document.getElementById("cookie-banner").style.display = "block";
}

// Acceptar cookies
document.getElementById("acceptar").onclick = function() {
    setCookie("cookieConsent", "accepted");
    document.getElementById("cookie-banner").style.display = "none";
};

// Rebutjar cookies
document.getElementById("rebutjar").onclick = function() {
    setCookie("cookieConsent", "rejected");
    document.getElementById("cookie-banner").style.display = "none";
};
// Opció de preferències
document.getElementById("preferencies").onclick = function() {
    alert("Hola");
};

// Tancar el banner sense guardar cap canvi
document.getElementById("tancar").onclick = function() {
    document.getElementById("cookie-banner").style.display = "none";
};