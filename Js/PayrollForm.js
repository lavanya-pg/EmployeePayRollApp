window.addEventListener('DOMContentLoaded', (event) => {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            document.getElementById("submitButton").disabled = false;
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
            document.getElementById("submitButton").disabled = false;
        } catch (exception) {
            textError.textContent = exception;
            document.getElementById("submitButton").disabled = true;
        }
    });

    startDate.addEventListener("input", async function () {
        const day = document.getElementById("day").value;
        const month = document.getElementById("month").value;
        const year = document.getElementById("year").value;
        const dateError = document.querySelector(".date-error");
        try {
            (new EmployeePayrollData()).startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            dateError.textContent = "";
            document.getElementById("submitButton").disabled = false;
        } catch(exception) {
            dateError.textContent = exception;
            document.getElementById("submitButton").disabled = true;
      }
    });
});

function save(){
    let employee = new EmployeePayrollData();
    employee.name = document.getElementById("name").value;
    employee.picture = document.querySelector('input[name = profile]:checked').value;
    employee.gender = document.querySelector('input[name = gender]:checked').value;
    employee.department = document.querySelector('input[name = department]:checked').value;
    employee.salary = document.getElementById("salary").value;
    employee.startDate = new Date(parseInt(document.getElementById("year").value), parseInt(document.getElementById("month").value) - 1, parseInt(document.getElementById("day").value));
    alert(employee.toString());
}

function resetForm() {
    document.getElementById("emp-form").reset();
}