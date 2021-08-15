let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('#name-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new PayrollModel()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
    const year = document.querySelector('.year');
    const month = document.querySelector('.month');
    const day = document.querySelector('.day');
    const dateError = document.querySelector('#date-error');
    year.addEventListener('change', () => {
        const selectedDate = new Date(year.value + '-' + month.value + '-' + day.value)
        try {
            (new PayrollModel()).startDate = selectedDate;
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    })
    month.addEventListener('change', () => {

        const selectedDate = new Date(year.value + '-' + month.value + '-' + day.value)
        try {
            (new PayrollModel()).startDate = selectedDate;
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    })
    day.addEventListener('change', () => {

        const selectedDate = new Date(year.value + '-' + month.value + '-' + day.value)
        try {
            (new PayrollModel()).startDate = selectedDate;
            dateError.textContent = "";
        } catch (e) {
            dateError.textContent = e;
        }
    })
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    checkForUpdate();
});

function save() {
    try {
        let empPayrollData = createEmployeePayroll();
        createAndUpdateStorage(empPayrollData);
    } catch (e) {
        alert(e);
        return;
    }
}

function createEmployeePayroll() {
    let employeepayrollData = new PayrollModel();
    employeepayrollData.name = getInputValueById('#name');
    employeepayrollData.profile = getSelectedValues('[name = profile]').pop();
    employeepayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeepayrollData.department = getSelectedValues('[name=department]');
    employeepayrollData.salary = getInputValueById('#salary');
    employeepayrollData.note = getInputValueById('#note');
    let date = getInputValueById('.year') + "-" + getInputValueById('.month') + "-" + getInputValueById('.day');
    employeepayrollData.startDate = new Date(date);
    alert("Your entry is successfully done");
    alert(employeepayrollData.toString());
    return employeepayrollData;
}

function getSelectedValues(attribute) {
    let allItems = document.querySelectorAll(attribute);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
}

function getInputValueById(id) {
    let value = document.querySelector(id).value;
    return value;
}

function getElementValueById(id) {
    let value = document.getElementById(id).value
    return value;
}

function createAndUpdateStorage(employeepayrollData) {
    let empPayrollId = JSON.parse(localStorage.getItem("EmployeePayrollIdIterator"));
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (empPayrollId == null) {
        empPayrollId = 1;
    }
    employeepayrollData['_id'] = empPayrollId;
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeepayrollData);
    } else {
        employeePayrollList = [employeepayrollData];
    }
    empPayrollId += 1;
    alert("Added Object to the local Storage" + employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollIdIterator", empPayrollId);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profile);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setCheckBox('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    //setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split('/');
    setValue('.day', date[0])
    setValue('.month', parseInt(date[1]))
    setValue('.year', date[2]);
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value == value)
            item.checked = true;
    });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setCheckBox = (property, values) => {
    let items = document.querySelectorAll(property);
    items.forEach(item => {
        if (values.includes(item.value)) {
            item.checked = true;
        }
    });
}
const resetForm = () => {
    document.querySelector("#name").value = "";
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    document.querySelector(".salary-output").textContent = 400000;
    document.querySelector(".day").value = 01;
    document.querySelector(".month").value = 01;
    document.querySelector(".year").value = 01;
    document.querySelector(".notes").value = "";
    document.querySelector(".date-error").textContent = "";
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}