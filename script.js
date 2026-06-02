const syllabusData = [
    {
        title: "English Language",
        color: "#38b2ac",
        topics: ["Reading Comprehension", "Idioms and Phrases", "One word Substitution", "Sentence Correction", "Active Passive", "Spellings Correction", "Fill in the Blanks", "Sentence Rearrangement", "Synonyms-Antonyms", "Cloze test", "Sentence Improvement", "Error Spotting"]
    },
    {
        title: "General Awareness",
        color: "#ecc94b",
        topics: ["Important Days", "Science", "India and neighboring countries", "People in News", "Sports", "Static GK", "Important Schemes", "Portfolio", "Books and Authors", "Current Affairs"]
    },
    {
        title: "General Intelligence and Reasoning",
        color: "#9f7aea",
        topics: ["Observation", "Coding and decoding", "Arithmetic number series", "Relationship concepts", "Arithmetical reasoning", "Figural classification", "Statement conclusion", "Syllogistic reasoning", "Similarities and differences", "Space visualization", "Spatial orientation", "Problem-solving", "Analysis", "Non-verbal series", "Judgment", "Blood Relations", "Decision making", "Visual memory", "Analogies"]
    },
    {
        title: "Quantitative Aptitude",
        color: "#48bb78",
        topics: ["Percentage", "Partnership Business", "Time and distance", "Time & Work", "Mixture and Alligation", "Decimals", "Fractions", "Quadrilaterals", "Regular Polygons", "Right Prism", "Right Circular Cone", "Interest", "Sphere", "Basic algebraic identities", "Profit and Loss", "Discount", "Relationships between numbers", "Ratio and Proportion", "Square roots", "Computation of whole numbers", "Right Circular Cylinder", "Triangle and centres", "Graphs of Linear Equations", "Averages", "Congruence and similarity", "Circle properties", "Complementary angles", "Bar diagram & Pie chart", "Triangle", "Frequency polygon", "Degree and Radian Measures", "Hemispheres", "Histogram", "Regular Right Pyramid", "Trigonometric ratio", "Heights and Distances", "Standard Identities", "Rectangular Parallelepiped"]
    }
];

let showPercentage = false;

// 1. Initialize App
function initApp() {
    renderUI();
    loadProgress();
    updateDashboard();

    document.getElementById('toggleFormat').addEventListener('click', function() {
        showPercentage = !showPercentage;
        this.innerText = showPercentage ? "Showing: Percentage (e.g., 10%)" : "Showing: Count (e.g., 1/10)";
        updateDashboard();
    });
}

// 2. Render Checkboxes and Cards
function renderUI() {
    const topicsContainer = document.getElementById('topicsContainer');
    const subjectCards = document.getElementById('subjectCards');
    
    syllabusData.forEach((subject, subIndex) => {
        // Create Dashboard Card
        subjectCards.innerHTML += `
            <div class="sub-card">
                <h3>${subject.title}</h3>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" id="bar-${subIndex}" style="background: ${subject.color}"></div>
                </div>
                <p id="text-${subIndex}">0 / ${subject.topics.length}</p>
            </div>
        `;

        // Create Checkbox List
        let topicsHTML = subject.topics.map((topic, topIndex) => `
            <label class="topic-item">
                <input type="checkbox" id="chk-${subIndex}-${topIndex}" onchange="saveProgress(this); updateDashboard()">
                ${topic}
            </label>
        `).join('');

        topicsContainer.innerHTML += `
            <div class="subject-section">
                <h3 class="subject-header">${subject.title}</h3>
                <div class="topic-list">${topicsHTML}</div>
            </div>
        `;
    });
}

// 3. Save & Load (Local Storage)
function saveProgress(checkbox) {
    localStorage.setItem(checkbox.id, checkbox.checked);
}

function loadProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(chk => {
        chk.checked = localStorage.getItem(chk.id) === 'true';
    });
}

// 4. Calculate and Update Visuals
function updateDashboard() {
    let totalTopics = 0;
    let totalCompleted = 0;

    syllabusData.forEach((subject, subIndex) => {
        let subTotal = subject.topics.length;
        let subCompleted = 0;

        subject.topics.forEach((_, topIndex) => {
            if (document.getElementById(`chk-${subIndex}-${topIndex}`).checked) {
                subCompleted++;
            }
        });

        totalTopics += subTotal;
        totalCompleted += subCompleted;

        // Update Subject Cards
        let subPercent = Math.round((subCompleted / subTotal) * 100);
        document.getElementById(`bar-${subIndex}`).style.width = `${subPercent}%`;
        
        let subText = showPercentage ? `${subPercent}%` : `${subCompleted} / ${subTotal} Topics`;
        document.getElementById(`text-${subIndex}`).innerText = subText;
    });

    // Update Total Gauge
    let totalPercent = Math.round((totalCompleted / totalTopics) * 100) || 0;
    let circleText = showPercentage ? `${totalPercent}%` : `${totalCompleted}/${totalTopics}`;
    
    document.getElementById('totalCircle').style.background = `conic-gradient(#38b2ac ${totalPercent}%, #e2e8f0 0)`;
    document.getElementById('totalText').innerText = circleText;
}

// Run app on load
window.onload = initApp;