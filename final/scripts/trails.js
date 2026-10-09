document.addEventListener("DOMContentLoaded", () => {
    initVisitBanner();
    fetchAndRenderTrails();
});

let allTrails = [];

// Local Storage Visit Tracking
function initVisitBanner() {
    const banner = document.querySelector("#visit-banner");
    if (!banner) return;

    const msToDays = 86400000;
    const lastVisit = localStorage.getItem("ecoTrailsLastVisit");
    const now = Date.now();

    if (!lastVisit) {
        banner.textContent = "Welcome! Explore the beauty of Negros Oriental eco-trails!";
    } else {
        const days = Math.floor((now - parseInt(lastVisit, 10)) / msToDays);
        if (days < 1) {
            banner.textContent = "Back so soon! Ready for another trek?";
        } else if (days === 1) {
            banner.textContent = "You last explored trails 1 day ago.";
        } else {
            banner.textContent = `You last explored trails ${days} days ago.`;
        }
    }

    localStorage.setItem("ecoTrailsLastVisit", now.toString());
}

// Fetch API with try...catch Block
async function fetchAndRenderTrails() {
    const container = document.querySelector("#trails-container");

    try {
        const response = await fetch("data/trails.json");
        if (!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }
        allTrails = await response.json();
        renderTrails(allTrails);
        setupFilterEvents();
    } catch (error) {
        console.error("Error fetching trail data:", error);
        if (container) {
            container.innerHTML = `<p class="error">Failed to load trails data. Please try again later.</p>`;
        }
    }
}

// Render dynamic items into DOM
function renderTrails(trails) {
    const container = document.querySelector("#trails-container");
    if (!container) return;

    container.innerHTML = "";

    if (trails.length === 0) {
        container.innerHTML = `<p>No eco-trails found matching your filter criteria.</p>`;
        return;
    }

    const favorites = JSON.parse(localStorage.getItem("favoriteTrails") || "[]");

    trails.forEach((trail) => {
        const card = document.createElement("article");
        card.classList.add("trail-card");

        const isFav = favorites.includes(trail.id);

        card.innerHTML = `
      <img src="${trail.image}" alt="${trail.name}" width="300" height="200" loading="lazy">
      <h3>${trail.name}</h3>
      <p class="location">📍 ${trail.location}</p>
      <span class="trail-badge">Difficulty: ${trail.difficulty}</span>
      <p>Elevation: <strong>${trail.elevation}</strong></p>
      <p>${trail.description}</p>
      <div class="trail-card-footer">
        <button type="button" class="eco-btn-primary details-btn" data-id="${trail.id}">Learn More</button>
        <button type="button" class="fav-btn ${isFav ? 'active' : ''}" data-id="${trail.id}">
          ${isFav ? '♥ Saved' : '♡ Save'}
        </button>
      </div>
    `;

        container.appendChild(card);
    });

    setupCardListeners();
}

// Event Listeners for Filters
function setupFilterEvents() {
    const searchInput = document.querySelector("#search-input");
    const difficultyFilter = document.querySelector("#difficulty-filter");

    const filterData = () => {
        const query = searchInput.value.toLowerCase().trim();
        const selectedDiff = difficultyFilter.value;

        const filtered = allTrails.filter((trail) => {
            const matchesSearch = trail.name.toLowerCase().includes(query) || trail.location.toLowerCase().includes(query);
            const matchesDiff = selectedDiff === "all" || trail.difficulty === selectedDiff;
            return matchesSearch && matchesDiff;
        });

        renderTrails(filtered);
    };

    if (searchInput) searchInput.addEventListener("input", filterData);
    if (difficultyFilter) difficultyFilter.addEventListener("change", filterData);
}

// Modal Dialog & Local Storage Favorites Listeners
function setupCardListeners() {
    const modal = document.querySelector("#trail-modal");
    const closeModalBtn = document.querySelector("#close-modal");

    document.querySelectorAll(".details-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            const item = allTrails.find((t) => t.id === id);

            if (item && modal) {
                document.querySelector("#modal-title").textContent = item.name;
                document.querySelector("#modal-location").textContent = item.location;
                document.querySelector("#modal-elevation").textContent = item.elevation;
                document.querySelector("#modal-difficulty").textContent = item.difficulty;
                document.querySelector("#modal-description").textContent = item.description;

                modal.showModal();
            }
        });
    });

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener("click", () => modal.close());
    }

    // Local Storage Save/Favorite Toggle
    document.querySelectorAll(".fav-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            let favorites = JSON.parse(localStorage.getItem("favoriteTrails") || "[]");

            if (favorites.includes(id)) {
                favorites = favorites.filter((favId) => favId !== id);
                e.target.classList.remove("active");
                e.target.textContent = "♡ Save";
            } else {
                favorites.push(id);
                e.target.classList.add("active");
                e.target.textContent = "♥ Saved";
            }

            localStorage.setItem("favoriteTrails", JSON.stringify(favorites));
        });
    });
}