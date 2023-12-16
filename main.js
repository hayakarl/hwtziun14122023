function saveGrade() {
    const existingGradesArray = getGradesArrayFromStorage();
    const newGrade = parseGradeFormDetails();
    existingGradesArray.push(newGrade);
    saveGradesArrayToStorage(existingGradesArray);
    displayGradesFromStorage();
    // console.log(bonus);
}

function getGradesArrayFromStorage() {
    // Read current JSON array from the local storage:
    const currentJsonArray = localStorage.getItem("allGrades");

    // Convert to a javascript array:
    let existingGradesArray = JSON.parse(currentJsonArray);
    if (existingGradesArray === null) {
        existingGradesArray = []; // Only on first time
    }
    return existingGradesArray;
}

function parseGradeFormDetails() {
    const studentNameBox = document.getElementById("studentNameBox");
    const subjectBox = document.getElementById("subjectBox");
    const gradeBox = document.getElementById("gradeBox");
    
    const studentName = studentNameBox.value;
    const subject = subjectBox.value;
    const grade = gradeBox.value;
    const bonusGrade = Math.min( 100, (+grade + 2*(studentName.length)));
    const randomInteger = Math.floor(Math.random() * 100);

        
    return {
        id: randomInteger,
        name: studentName,
        subject: subject,
        grade: grade,
        bonus: bonusGrade,
    };
    
}

function saveGradesArrayToStorage(existingGradesArray) {
    const updatedJsonArray = JSON.stringify(existingGradesArray);
    localStorage.setItem("allGrades", updatedJsonArray);
}

function displayGradesFromStorage() {
    const existingGradesArray = getGradesArrayFromStorage();
    const containerDiv = document.getElementById("containerDiv");
    containerDiv.innerHTML = createHtmlTable(existingGradesArray);
}

function createHtmlTable(gradesArray) {

    if (gradesArray.length === 0) {
        return '';
    }
        
    let table = `<table>
                    <tr>
                        <th>Id</th>
                        <th>Student Name</th>
                        <th>Subject</th>
                        <th>Grade</th>
                        <th>BonusIn</th>
                        <th>Action</th>
                    </tr>`;

    for (const grade of gradesArray) {
        table += `<tr>
                    <td id="${grade.id}">${grade.id}</td>
                    <td>${grade.name}</td>
                    <td>${grade.subject}</td>
                    <td>${grade.grade}</td>
                    <td>${grade.bonus}</td>
                    <td><button onclick="deleteGrade(document.getElementById(${grade.id}).innerText)">Delete</button></td>
                  </tr>`
    }
    
    table += `</table>`;
    return table;
}

function deleteGrade(gradeId) {
    const existingGradesArray = getGradesArrayFromStorage();
    const updatedGradesArray = [];

    for (const grade of existingGradesArray) {
        if (grade.id !== +gradeId) {
            updatedGradesArray.push(grade);
        }
    }

    saveGradesArrayToStorage(updatedGradesArray);
    displayGradesFromStorage();
}