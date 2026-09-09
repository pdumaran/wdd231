const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

// Responsive Navigation Toggle
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuToggle.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
    });
}

// Fetch and Display JSON Data using async/await
async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching member data:", error);
        membersContainer.innerHTML = "<p>Unable to load business directory at this time.</p>";
    }
}

// Map Membership level to string
function getMembershipText(level) {
    switch (level) {
        case 3: return "Gold Member";
        case 2: return "Silver Member";
        default: return "Member";
    }
}

// Render HTML cards using template literals
function displayMembers(members) {
    membersContainer.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        const section = document.createElement("section");
        section.classList.add("member-card");

        section.innerHTML = `
      <img src="${member.image}" alt="${member.name} Logo" width="200" height="150" loading="lazy">
      <h3>${member.name}</h3>
      <p class="tagline"><em>${member.tagline}</em></p>
      <p class="membership-level">${getMembershipText(member.membershipLevel)}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
    `;

        membersContainer.appendChild(section);
    });
}

// Grid / List View Toggle
if (gridButton && listButton) {
    gridButton.addEventListener("click", () => {
        membersContainer.classList.add("grid");
        membersContainer.classList.remove("list");
    });

    listButton.addEventListener("click", () => {
        membersContainer.classList.add("list");
        membersContainer.classList.remove("grid");
    });
}

// Footer Dates
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

getMembers();