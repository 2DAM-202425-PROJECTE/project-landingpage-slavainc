document.addEventListener("DOMContentLoaded", function () {
    // Función para cargar un archivo HTML en un elemento
    function loadHTML(elementId, url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
            })
            .catch(error => {
                console.error("Error al cargar contenido:", error);
            });
    }

    // Cargar header y footer
    loadHTML("header-placeholder", "/project-landingpage-slavainc/layouts/header.html");
    loadHTML("footer-placeholder", "/project-landingpage-slavainc/layouts/footer.html");
});