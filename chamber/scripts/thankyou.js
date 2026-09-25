document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const displayContainer = document.querySelector("#submitted-data");

    if (displayContainer) {
        const fname = urlParams.get("fname") || "N/A";
        const lname = urlParams.get("lname") || "N/A";
        const email = urlParams.get("email") || "N/A";
        const phone = urlParams.get("phone") || "N/A";
        const org = urlParams.get("org") || "N/A";
        const membership = urlParams.get("membership") || "N/A";
        const rawTimestamp = urlParams.get("timestamp") || "";

        let formattedDate = "N/A";
        if (rawTimestamp) {
            const dateObj = new Date(rawTimestamp);
            if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toLocaleString("en-US", {
                    dateStyle: "full",
                    timeStyle: "medium"
                });
            }
        }

        displayContainer.innerHTML = `
            <p><strong>First Name:</strong> ${fname}</p>
            <p><strong>Last Name:</strong> ${lname}</p>
            <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Mobile Phone:</strong> ${phone}</p>
            <p><strong>Business / Organization:</strong> ${org}</p>
            <p><strong>Membership Level:</strong> ${membership}</p>
            <p><strong>Submission Date & Time:</strong> ${formattedDate}</p>
        `;
    }
});