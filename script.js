document.getElementById('addRow').addEventListener('click', function() {
    var table = document.getElementById('gradeTable');
    var newRow = table.insertRow(table.rows.length - 1);
    newRow.innerHTML = `
        <td><input type="text" class="course" placeholder="Enter Your Course here..."></td>
        <td>
            <select class="credit-unit">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </td>
        <td>
            <select class="grade">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>
        </td>
        <td><button class="removeRow">Remove</button></td>
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
    var totalPoints = 0;
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
                gradePoint = NaN;
        }

        totalUnits += creditUnit;
        totalPoints += (creditUnit * gradePoint);
    });

    if (hasError) {
        showErrorPopup(errorMessage);
        return;
    }

    if (totalUnits === 0) {
        showErrorPopup('Please fill in all required details.');
        return;
    }

    var gpa = (totalPoints / totalUnits).toFixed(2);
    document.getElementById('result').innerText = `${userName}, your Grade Point Average is ${gpa}`;
});

document.getElementById('clearResult').addEventListener('click', function() {
    document.getElementById('userName').value = '';
    document.querySelectorAll('#gradeTable tr:not(:first-child):not(:last-child)').forEach(function(row) {
        row.remove();
    });
    document.getElementById('result').innerText = '';
});

document.querySelectorAll('.removeRow').forEach(function(button) {
    button.addEventListener('click', function() {
        this.closest('tr').remove();
    });
});

document.getElementById('printResult').addEventListener('click', function() {
    var userName = document.getElementById('userName').value;
    var rows = document.querySelectorAll('#gradeTable tr:not(:first-child):not(:last-child)');
    var result = document.getElementById('result').innerText;

    if (result) {
        var printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Print GPA Result</title>');
        printWindow.document.write('<style>');
        printWindow.document.write('body { font-family: Arial, sans-serif; margin: 20px; }');
        printWindow.document.write('table { width: 100%; border-collapse: collapse; margin-top: 20px; }');
        printWindow.document.write('th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }');
        printWindow.document.write('th { background-color: #f2f2f2; }');
        printWindow.document.write('h1, h2 { text-align: center; }');
        printWindow.document.write('</style></head><body>');
        printWindow.document.write('<h1>GPA Report</h1>');
        printWindow.document.write('<h2>' + userName + '</h2>');
        printWindow.document.write('<table>');
        printWindow.document.write('<tr><th>Course</th><th>Credit Unit</th><th>Grade</th></tr>');

        rows.forEach(function(row) {
            var course = row.querySelector('.course').value;
            var creditUnit = row.querySelector('.credit-unit').value;
            var grade = row.querySelector('.grade').value;

            printWindow.document.write('<tr>');
            printWindow.document.write('<td>' + course + '</td>');
            printWindow.document.write('<td>' + creditUnit + '</td>');
            printWindow.document.write('<td>' + grade + '</td>');
            printWindow.document.write('</tr>');
        });

        printWindow.document.write('</table>');
        printWindow.document.write('<h2>' + result + '</h2>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    } else {
        showErrorPopup('Please calculate your GPA before printing.');
    }
});

function showErrorPopup(message) {
    var errorPopup = document.getElementById('error-popup');
    var errorText = document.getElementById('error-popup-text');
    errorText.innerText = message;
    errorPopup.style.display = 'block';
}

document.getElementById('error-popup-close').addEventListener('click', function() {
    document.getElementById('error-popup').style.display = 'none';
});

// Modal for educational slides
var modal = document.getElementById("education-modal");
var span = document.getElementsByClassName("close")[0];

document.getElementById('show-education').addEventListener('click', function() {
    modal.style.display = "block";
});

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
