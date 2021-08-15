window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('#name-error');
    name.addEventListener('input',function(){
        if(name.value.length==0)
        {
            textError.textContent="";
            return;
        }
        try{
            (new PayrollModel()).name = name.value;
            textError.textContent="";
        }
        catch(e)
        {
            textError.textContent = e;
        }
    });
    const year = document.querySelector('.year');
    const month = document.querySelector('.month');
    const day = document.querySelector('.day');
    const dateError = document.querySelector('#date-error');
    year.addEventListener('change',()=>{
        const selectedDate = new Date(year.value + '-' + month.value + '-' + day.value)
        try{
            (new PayrollModel()).startDate = selectedDate;
            dateError.textContent="";
        }
        catch(e)
        {
            dateError.textContent = e;
        }
    }
    )
    month.addEventListener('change',()=>{
        
        const selectedDate = new Date(year.value + '-' + month.value + '-' + day.value)
        try{
            (new PayrollModel()).startDate = selectedDate;
            dateError.textContent="";
        }
        catch(e)
        {
            dateError.textContent = e;
        }
    }
    )
    day.addEventListener('change',()=>{
        
        const selectedDate = new Date(year.value + '-' + month.value + '-' + day.value)
        try{
            (new PayrollModel()).startDate = selectedDate;
            dateError.textContent="";
        }
        catch(e)
        {
            dateError.textContent = e;
        }
    }
    )
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
    output.textContent = salary.value;
    });
});
function save(){
    try{    
        let empPayrollData = createEmployeePayroll();
        createAndUpdateStorage(empPayrollData);
    }
    catch(e)
    {
        alert(e);
        return;
    }
}
function createEmployeePayroll()
{
    let employeepayrollData = new PayrollModel();
    employeepayrollData.name = getInputValueById('#name');
    employeepayrollData.profile = getSelectedValues('[name = profile]').pop();
    employeepayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeepayrollData.department = getSelectedValues('[name=department]');
    employeepayrollData.salary = getInputValueById('#salary');
    employeepayrollData.note = getInputValueById('#note');
    let date = getInputValueById('.year') + "-"+ getInputValueById('.month') + "-" + getInputValueById('.day');
    employeepayrollData.startDate = new Date(date);
    alert("Your entry is successfully done");
    alert(employeepayrollData.toString());
    return employeepayrollData;
}
function getSelectedValues(attribute)
{
    let allItems = document.querySelectorAll(attribute);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked)
        selItems.push(item.value);
    });
    return selItems;
}
function getInputValueById(id){
    let value = document.querySelector(id).value;
    return value;
}
function getElementValueById(id){
    let value = document.getElementById(id).value
    return value;
}
function createAndUpdateStorage(employeepayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined)
    {
        employeePayrollList.push(employeepayrollData);
    }
    else
    {
        employeePayrollList = [employeepayrollData];
    }
    alert("Added Object to the local Storage" + employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}
const resetForm = () => {
    document.querySelector("#name").value = "";
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    document.querySelector(".salary-output").textContent=400000;
    document.querySelector(".day").value = 01;
    document.querySelector(".month").value = 01;
    document.querySelector(".year").value = 01;
    document.querySelector(".notes").value= "";
    document.querySelector(".date-error").textContent = "";
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked = false;
    });
}