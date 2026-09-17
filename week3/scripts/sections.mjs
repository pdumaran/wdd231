// Populate select dropdown options dynamically
export function populateSelect(sections) {
    const selectElement = document.querySelector("#sectionNumber");
    sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section.sectionNum;
        option.textContent = `Section ${section.sectionNum}`;
        selectElement.appendChild(option);
    });
}