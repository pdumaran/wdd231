import { discoverItems } from '../data/discover.mjs';

document.addEventListener("DOMContentLoaded", () => {
    renderDiscoverCards(discoverItems);
    handleLastVisitMessage();
});

function renderDiscoverCards(items) {
    const container = document.querySelector(".discover-grid");
    if (!container) return;

    container.innerHTML = "";

    items.forEach((item, index) => {
        const card = document.createElement("section");
        card.classList.add("discover-card");
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.image}" alt="${item.alt}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button" class="learn-more-btn">Learn More</button>
    `;

        container.appendChild(card);
    });
}

function handleLastVisitMessage() {
    const messageElement = document.querySelector("#visit-message");
    if (!messageElement) return;

    const msToDays = 86400000;
    const lastVisit = localStorage.getItem("lastVisitDate");
    const now = Date.now();

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const differenceInMs = now - parseInt(lastVisit, 10);
        const daysBetween = Math.floor(differenceInMs / msToDays);

        if (daysBetween < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            messageElement.textContent = "You last visited 1 day ago.";
        } else {
            messageElement.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem("lastVisitDate", now.toString());
}