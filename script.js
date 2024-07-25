document.getElementById('addRow').addEventListener('click', function() {
    var table = document.getElementById('gradeTable');
    var newRow = table.insertRow(table.rows.length - 1); // Insert new row before the last row (footer)
    newRow.innerHTML = `
        <td data-label="Course"><input type="text" class="course" placeholder="Enter Your Course here..." aria-label="Course"></td>
        <td data-label="Credit Unit (CU)">
            <select class="credit-unit" aria-label="Credit Unit">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </td>
        <td data-label="Grade">
            <select class="grade" aria-label="Grade">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>
        </td>
        <td><button class="removeRow" aria-label="Remove Row">Remove</button></td>
    `;

    // Add event listener to the new remove button
    newRow.querySelector('.removeRow').addEventListener('click', function() {
        this.closest('tr').remove();
    });
});

document.getElementById('calculate').addEventListener('click', function() {
    var userName = document.getElementById('userName').value;
    var rows = document.querySelectorAll('#gradeTable tr:not(:first-child):not(:last-child)');
    var totalUnits = 0;
    var totalQualityPoints = 0;
    var hasError = false;
    var errorMessage = '';

    if (!userName) {
        showErrorPopup('Please enter your name.');
        return;
    }

    rows.forEach(function(row) {
        var course = row.querySelector('.course').value;
        var creditUnit = parseInt(row.querySelector('.credit-unit').value);
        var grade = row.querySelector('.grade').value;
        var gradePoint;

        if (!course) {
            hasError = true;
            errorMessage = 'Please fill in all course names.';
            return;
        }

        switch (grade) {
            case 'A':
                gradePoint = 5;
                break;
            case 'B':
                gradePoint = 4;
                break;
            case 'C':
                gradePoint = 3;
                break;
            case 'D':
                gradePoint = 2;
                break;
            case 'E':
                gradePoint = 1;
                break;
            case 'F':
                gradePoint = 0;
                break;
            default:
                hasError = true;
                errorMessage = 'Invalid grade selected.';
                return;
        }

        if (creditUnit < 1 || creditUnit > 3) {
            hasError = true;
            errorMessage = 'Credit Unit must be between 1 and 3.';
            return;
        }

        totalUnits += creditUnit;
        totalQualityPoints += creditUnit * gradePoint;
    });

    if (hasError) {
        showErrorPopup(errorMessage);
    } else {
        var gpa = (totalQualityPoints / totalUnits).toFixed(2);
        document.getElementById('result').innerText = `${userName}, your GPA is: ${gpa}`;
    }
});

document.getElementById('clearResult').addEventListener('click', function() {
    document.getElementById('result').innerText = '';
    document.getElementById('userName').value = '';
    document.querySelectorAll('#gradeTable input, #gradeTable select').forEach(function(element) {
        element.value = '';
    });
});

document.getElementById('printResult').addEventListener('click', function() {
    var resultContent = document.getElementById('result').innerText;
    var tableRows = document.querySelectorAll('#gradeTable tr:not(:first-child):not(:last-child)');
    
    if (resultContent) {
        // Build the HTML content for printing
        var tableHTML = '<table border="1" style="width:100%; border-collapse:collapse;">';
        tableHTML += '<tr><th>Course</th><th>Credit Unit</th><th>Grade</th></tr>';
        
        tableRows.forEach(function(row) {
            var course = row.querySelector('.course').value;
            var creditUnit = row.querySelector('.credit-unit').value;
            var grade = row.querySelector('.grade').value;
            
            tableHTML += '<tr>';
            tableHTML += `<td>${course}</td>`;
            tableHTML += `<td>${creditUnit}</td>`;
            tableHTML += `<td>${grade}</td>`;
            tableHTML += '</tr>';
        });
        
        tableHTML += '</table>';
        tableHTML += '<br>';
        tableHTML += '<h2>' + resultContent + '</h2>';
        
        // Create a new window for printing
        var printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print Result</title>');
        printWindow.document.write('<style>table {border-collapse: collapse; width: 100%;} th, td {border: 1px solid black; padding: 8px; text-align: left;} th {background-color: #f2f2f2;}</style>');
        printWindow.document.write('</head><body >');
        printWindow.document.write('<h1>GPA Calculation Result</h1>');
        printWindow.document.write(tableHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    } else {
        showErrorPopup('Nothing to print. Please calculate the GPA first.');
    }
});

function showErrorPopup(message) {
    document.getElementById('error-popup-text').innerText = message;
    document.getElementById('error-popup').style.display = 'block';
}

document.getElementById('error-popup-close').addEventListener('click', function() {
    document.getElementById('error-popup').style.display = 'none';
});

// Modal functionality for educational slides
var modal = document.getElementById('education-modal');
var span = document.getElementsByClassName('close')[0];
var prevSlide = document.getElementsByClassName('prev-slide')[0];
var nextSlide = document.getElementsByClassName('next-slide')[0];
var slides = document.getElementsByClassName('slide');
var currentSlideIndex = 0;

document.getElementById('show-education').addEventListener('click', function() {
    modal.style.display = 'block';
    showSlide(currentSlideIndex);
});

span.onclick = function() {
    modal.style.display = 'none';
};

prevSlide.onclick = function() {
    if (currentSlideIndex > 0) {
        showSlide(--currentSlideIndex);
    }
};

nextSlide.onclick = function() {
    if (currentSlideIndex < slides.length - 1) {
        showSlide(++currentSlideIndex);
    }
};

function showSlide(index) {
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[index].style.display = 'block';
}
