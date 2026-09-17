// Set header title and course code
export function setTitle(course) {
    document.querySelector("#courseName").textContent = course.name;
    document.querySelector("#courseCode").textContent = course.code;
}

// Render section details into table rows
export function renderSections(sections) {
    const html = sections.map(
        (section) => `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.instructor}</td>
    </tr>`
    );
    document.querySelector("#sections").innerHTML = html.join("");
}