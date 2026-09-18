// Navigation Toggle
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuToggle.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
    });
}

// Footer Dates
const yearSpan = document.querySelector("#currentyear");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.querySelector("#lastModified");
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
}