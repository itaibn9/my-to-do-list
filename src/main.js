
function add_todo_trigger(){
    let inputValue = input.value;
    if(inputValue === ""){
        alert("to do text required");
        return;
    }
    input.value = '';
    if(todoCounter > limitTask)//feature reminder to complete your todo tasks;
    {
    alert("Come on start completing your tasks");
    }
    
    
    let creationTime = new Date().toISOString().substr(0,18);
    let timePresentor = creationTime.replace("T", "  ")
     const selectedPriority = inputPriority.value;
     let dateTodo = dueDateInput.value;
     dueDateInput.value = '';
     // add todo data to array
     let todoTaskArr = [];
     todoTaskArr.push(selectedPriority);
     todoTaskArr.push(timePresentor);
     todoTaskArr.push(inputValue);
     todoTaskArr.push(dateTodo);
     todoListArr.push(todoTaskArr);

     show_task_on_screen(selectedPriority, timePresentor, inputValue, dateTodo);
}

function show_task_on_screen(todo_priority, time, text, date){
    todoCounter ++;
    counter.textContent = todoCounter;
    const container = document.createElement("div");
    container.setAttribute('class', 'todoContainer');
    const doneButton = document.createElement("button");
    doneButton.setAttribute('class', 'done_button');
    const task = document.createElement("i");
    task.setAttribute('class', 'todoText');
    const timeCreated = document.createElement("span");
    timeCreated.setAttribute('class', 'todoCreatedAt');
    timeCreated.textContent =" - Created At: " + time + " - ";
    const priority = document.createElement('strong');
    priority.setAttribute('class', 'todoPriority');
    priority.textContent = todo_priority;
    const dateExpire = document.createElement("strong");
    dateExpire.setAttribute('class', 'experassion_day');
    let today = new Date().toISOString().substr(0, 10);
    if(today === date){
        task.style.backgroundColor="yellow";
        task.style.color="black";}
        else if(today > date && date != ""){
            task.style.backgroundColor="red";
            task.style.color="black";}
    if(date == ""){
        dateExpire.textContent = "";}
    else{dateExpire.textContent = " - until: " + date;}
    tasksList.appendChild(container);
    task.textContent = text;
    doneButton.textContent = 'Done';
    container.appendChild(priority);
    container.appendChild(timeCreated);
    container.appendChild(task); 
    container.appendChild(dateExpire);
    container.appendChild(doneButton);
    const breakLine = document.createElement('br');
    const anotherBreakLine = document.createElement('br');
    container.appendChild(breakLine);
    container.appendChild(anotherBreakLine);
    doneButton.addEventListener('click', function(){done_button_trigger(container, time);});
    input.focus();
    
}

function done_button_trigger(childPlacement, deleted_todo_time){
    tasksList.removeChild(childPlacement);
    todoCounter --;
    counter.textContent = todoCounter;
    for(let i = 0; i < todoListArr.length; i++){
        if(todoListArr[i][1] === deleted_todo_time) //delete task from the data todo list array.
        { todoListArr.splice(i, 1); }
    }
    input.focus();
}

function show_all_taskList(todoListArr){
    for(let i = 0; i< todoListArr.length; i++){
        show_task_on_screen(todoListArr[i][0], todoListArr[i][1], todoListArr[i][2], todoListArr[i][3])  // present the sorted list.
    } 
    input.focus();
    }

function sortButtonTrigger(){  
    clean_presented_list();
    todoListArr = todoListArr.sort().reverse(); // sorts the list
    show_all_taskList(todoListArr);
    }

function clean_presented_list() {
    while(tasksList.firstChild){
        tasksList.removeChild(tasksList.lastChild); // first it cleans the shown list;
    }
    todoCounter = 0;
}

function search_button_trigger(text) {
    disable_Buttons_In_Search_Mode();
    const searchResultArr = [];
    for(let i = 0; i < todoListArr.length; i++){
        let str = todoListArr[i][2];
        if(str.includes(text)){
            searchResultArr.push(todoListArr[i]);
        }
    }
    clean_presented_list();
    show_all_taskList(searchResultArr);
}

function all_task_button_trigger() {
    input.value = "";
    able_Buttons_In_AllTask_Mode();
    clean_presented_list();
    show_all_taskList(todoListArr);
}

function disable_Buttons_In_Search_Mode() {
    sortButton.disabled = true;
    sortButton.style.backgroundColor="LightGray";
    addButton.disabled = true;
    addButton.style.backgroundColor="LightGray";
    searchButton.disabled = true;
    searchButton.style.backgroundColor="LightGray";
    allTasksButton.disabled = false;
    allTasksButton.style.backgroundColor="green";
}

function able_Buttons_In_AllTask_Mode() {
    sortButton.disabled = false;
    sortButton.style.backgroundColor="green";
    addButton.disabled = false;
    addButton.style.backgroundColor="green";
    searchButton.disabled = false;
    searchButton.style.backgroundColor="green";
    allTasksButton.disabled = true;
    allTasksButton.style.backgroundColor="LightGray";
}
// control section:
const limitTask = 5;
const counter = document.getElementById("counter");
let todoCounter = 0;
counter.textContent = todoCounter; 
let todoListArr = []; // array of all the to do list tasks.
const inputPriority = document.getElementById('prioritySelector');
// view section:
const tasksList = document.querySelector('ul');
const addButton = document.getElementById('addButton');
const input = document.querySelector('input');
input.focus();
const dueDateInput = document.getElementById("dueTime");
addButton.addEventListener('click', add_todo_trigger);
const sortButton = document.getElementById("sortButton");
sortButton.addEventListener('click', sortButtonTrigger);
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#dueTime").setAttribute('min', today);
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function(){
    search_button_trigger(input.value);});
const allTasksButton = document.getElementById('allTask');
allTasksButton.disabled = true;
allTasksButton.addEventListener('click', all_task_button_trigger);
const helpButton = document.getElementById('helpButton');
helpButton.addEventListener('click', function(){
    alert("we need to put instructions");
})
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13){
       addButton.click(); 
    }
})
