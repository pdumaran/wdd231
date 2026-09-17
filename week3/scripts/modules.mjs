import aCourse from './course.mjs';
import { populateSelect } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

// Initialize view components
setTitle(aCourse);
populateSelect(aCourse.sections);
renderSections(aCourse.sections);

// Event Listeners for Enroll/Drop buttons
document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    if (sectionNum !== 0) {
        aCourse.changeEnrollment(sectionNum, true);
        renderSections(aCourse.sections);
    }
});

document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    if (sectionNum !== 0) {
        aCourse.changeEnrollment(sectionNum, false);
        renderSections(aCourse.sections);
    }
});