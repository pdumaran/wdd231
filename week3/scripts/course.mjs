const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
        { sectionNum: 1, roomNum: "STC 353", enrolled: 26, days: "TTh", instructor: "Bro T" },
        { sectionNum: 2, roomNum: "STC 347", enrolled: 28, days: "TTh", instructor: "Sis A" }
    ],

    // Method to update enrollment numbers
    changeEnrollment(sectionNum, isEnroll = true) {
        const sectionIndex = this.sections.findIndex(
            (section) => section.sectionNum == sectionNum
        );
        if (sectionIndex >= 0) {
            if (isEnroll) {
                this.sections[sectionIndex].enrolled++;
            } else if (this.sections[sectionIndex].enrolled > 0) {
                this.sections[sectionIndex].enrolled--;
            }
        }
    }
};

export default aCourse;