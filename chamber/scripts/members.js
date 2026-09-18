// Nav Toggle and Footer Dates for all pages
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        menuToggle.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
    });
}

const currentYearEl = document.querySelector("#currentyear");
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.querySelector("#lastModified");
if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;
}

// Directory Page Grid/List View & Data Fetching
const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

if (membersContainer) {
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

    function getMembershipText(level) {
        switch (level) {
            case 3: return "Gold Member";
            case 2: return "Silver Member";
            default: return "Member";
        }
    }

    function displayMembers(members) {
        membersContainer.innerHTML = "";

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

    getMembers();
}