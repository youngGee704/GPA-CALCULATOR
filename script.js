document.getElementById('addRow').addEventListener('click', function() {
    var table = document.getElementById('gradeTable');
    var newRow = table.insertRow(table.rows.length - 1);
    newRow.innerHTML = `
        <td><input type="text" class="course" placeholder="Enter Your Course here..."></td>
        <td><input type="number" class="credit-unit" placeholder="Enter your Credit Unit here"></td>
        <td><input type="text" class="grade" placeholder="Enter Your Grade here"></td>
    `;
});

document.getElementById('calculate').addEventListener('click', function() {
    var table = document.getElementById('gradeTable');
    var totalCreditPoints = 0;
    var totalCreditUnits = 0;
    var error = false;
    var errorMessage = '';

    for (var i = 1; i < table.rows.length - 1; i++) {
        var creditUnit = parseFloat(table.rows[i].querySelector('.credit-unit').value);
        var grade = table.rows[i].querySelector('.grade').value.toUpperCase();
        var gradePoint = getGradePoint(grade);

        if (isNaN(creditUnit) || creditUnit <= 0) {
            error = true;
            errorMessage += 'Error: Invalid credit unit for course ' + i + '. ';
        }

        if (isNaN(gradePoint)) {
            error = true;
            errorMessage += 'Error: Invalid grade for course ' + i + '. ';
        }

        var qualityPoint = creditUnit * gradePoint;
        totalCreditPoints += qualityPoint;
        totalCreditUnits += creditUnit;
    }

    if (error) {
        showError(errorMessage);
        document.getElementById('result').innerText = '';
    } else {
        var gpa = totalCreditPoints / totalCreditUnits;
        document.getElementById('result').innerText = 'Your GPA is: ' + gpa.toFixed(2);
        hideError();
    }
});

function showError(message) {
    var errorPopup = document.getElementById('error-popup');
    var errorContent = document.getElementById('error-popup-content');
    var errorText = document.getElementById('error-popup-text');

    errorText.innerText = message;
    errorPopup.style.display = 'block';

    document.getElementById('error-popup-close').addEventListener('click', function() {
        hideError();
    });

    window.addEventListener('click', function(event) {
        if (event.target == errorPopup) {
            hideError();
        }
    });
}

function hideError() {
    var errorPopup = document.getElementById('error-popup');
    errorPopup.style.display = 'none';
}

function getGradePoint(grade) {
    switch (grade) {
        case 'A':
            return 5;
        case 'B':
            return 4;
        case 'C':
            return 3;
        case 'D':
            return 2;
        case 'E':
            return 1;
        case 'F':
            return 0;
        default:
            return NaN;
    }
}
