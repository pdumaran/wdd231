document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Menu Toggle
  const menuToggle = document.querySelector("#menu-toggle");
  const navMenu = document.querySelector("#nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // Footer Year & Last Modified
  const yearSpan = document.querySelector("#currentyear");
  const lastModSpan = document.querySelector("#lastModified");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (lastModSpan) {
    lastModSpan.textContent = `Last Modified: ${document.lastModified}`;
  }
});