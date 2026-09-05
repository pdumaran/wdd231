const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the basic concepts of program structure and design.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to building web sites using HTML and CSS.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to write functions and construct software programs.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces classes, objects, and object-oriented design.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn JavaScript to create dynamic web pages.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience and accessibility.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseList = document.querySelector('#course-list');
const totalCreditsDisplay = document.querySelector('#total-credits');
const allBtn = document.querySelector('#all-btn');
const cseBtn = document.querySelector('#cse-btn');
const wddBtn = document.querySelector('#wdd-btn');

function displayCourses(filteredCourses) {
    courseList.innerHTML = '';

    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-item');
        if (course.completed) {
            card.classList.add('completed');
        }
        card.textContent = `${course.subject} ${course.number}`;
        courseList.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = `The total credits for courses listed above is ${totalCredits}`;
}

function updateActiveButton(activeBtn) {
    [allBtn, cseBtn, wddBtn].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

allBtn.addEventListener('click', () => {
    displayCourses(courses);
    updateActiveButton(allBtn);
});

cseBtn.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
    updateActiveButton(cseBtn);
});

wddBtn.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
    updateActiveButton(wddBtn);
});

// Initial display on page load
displayCourses(courses);