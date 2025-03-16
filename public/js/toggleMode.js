document.addEventListener("DOMContentLoaded", function() {
    const modeButton = document.getElementById("cornerButton");
    const body = document.body;

    modeButton.addEventListener("click", function() {
        if (body.classList.contains("light-mode")) {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
        } else {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
        }
    });
});