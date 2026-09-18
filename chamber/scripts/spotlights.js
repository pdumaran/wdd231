const spotlightContainer = document.querySelector("#spotlight-cards");

async function fetchSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.error("Error loading spotlights:", error);
        if (spotlightContainer) {
            spotlightContainer.innerHTML = "<p>Unable to load spotlights at this time.</p>";
        }
    }
}

function displaySpotlights(members) {
    if (!spotlightContainer) return;
    spotlightContainer.innerHTML = "";

    // Filter membershipLevel 3 (Gold) and 2 (Silver)
    const goldAndSilver = members.filter(
        member => member.membershipLevel === 3 || member.membershipLevel === 2
    );

    // Randomize array order
    const shuffled = goldAndSilver.sort(() => 0.5 - Math.random());

    // Select 2 to 3 members
    const count = Math.min(3, shuffled.length);
    const selectedMembers = shuffled.slice(0, count);

    selectedMembers.forEach(member => {
        const card = document.createElement("article");
        card.className = "spotlight-card";

        const isGold = member.membershipLevel === 3;
        const levelText = isGold ? "Gold Member" : "Silver Member";
        const levelClass = isGold ? "gold" : "silver";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <span class="membership-badge ${levelClass}">${levelText}</span>
            <p><em>"${member.tagline}"</em></p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Website</a></p>
        `;

        spotlightContainer.appendChild(card);
    });
}

if (spotlightContainer) {
    fetchSpotlights();
}