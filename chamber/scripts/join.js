// Function to populate timestamp
function setFormTimestamp() {
    const timestampInput = document.querySelector("#timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
}

// Execute immediately if the DOM is already ready, otherwise on DOMContentLoaded
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setFormTimestamp);
} else {
    setFormTimestamp();
}

// Modal dialog controls
document.addEventListener("DOMContentLoaded", () => {
    const openButtons = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.querySelector(`#${modalId}`);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });
});