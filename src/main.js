let draggedIndex;
let index=0;
let searchResultArr = [];
// Declare new variables and from HTML.
const limitTask = 5; // After passing this limit, alert will be shown.
const counter = document.getElementById("counter");
let todoCounter = 0;
counter.textContent = todoCounter; 
let todoListArr = []; // array of all the to do list tasks.
const inputPriority = document.getElementById('prioritySelector');
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
    alert('To add task fill the input field, your priority (1-low, 5-high) and due date (optional) and press the Add button.\n- If you just want to add task with a default priority (1) and no due date you can simply click enter after filling the field input.\n- If you have more than 5 open tasks you will get an alert that will encourage you to finish tasks.\n- To sort the list by priority from high to low, press Sort button.\n- To search a task, fill the search text in the input fill and click Search button.\n- You will get all the To-DO tasks that contains your search text, and all the action buttons will be disabled.\n- You can mark a task as done also at the Search list.\n- To see again the full To-Do list press the Refresh button.\n- When you finish a task or you simply want to remove it, press the Done button on the actual task.\n- Task due date – A task that is due for today will be marked yellow.\n- Task that passed the due date will be marked red.');
});
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13){
       addButton.click(); 
    }
});


function swap_arr(indexFrom, indexTo) {
    console.log(searchResultArr);
    if(searchResultArr.length != 0){
        [searchResultArr[indexFrom], searchResultArr[indexTo]] = [searchResultArr[indexTo], searchResultArr[indexFrom]];
    } else {
         [todoListArr[indexFrom], todoListArr[indexTo]] = [todoListArr[indexTo], todoListArr[indexFrom]];
    }
 
  clean_presented_list();
  if(searchResultArr.length != 0){
     show_all_taskList(searchResultArr);
    } else {
        show_all_taskList(todoListArr);
    }
}

function add_todo_trigger(){
    let inputValue = input.value;
    if(inputValue === ""){
        alert("to do text required");
        return;
    }
    input.value = '';
    if(todoCounter > limitTask){//feature reminder to complete your todo tasks;
        alert("Come on start completing your tasks");
    }
    let creationTime = new Date().toISOString().substr(0,18);
    let timePresentor = creationTime.replace("T", "  ");
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
    container.setAttribute('draggable', 'true');
    container.setAttribute('id', index);
    index++;
    
    container.addEventListener("drag", function(event) {

    }, false);
    
    container.addEventListener("dragstart", function(event) {
      // store a ref. on the dragged elem
      draggedIndex = event.target.id;
      // make it half transparent
      event.target.style.opacity = .5;
    }, false);
    
    container.addEventListener("dragend", function(event) {
      // reset the transparency
      event.target.style.opacity = "";
    }, false);
    
    // events fired on the drop targets 
    container.addEventListener("dragover", function(event) {
      // prevent default to allow drop
      event.preventDefault();
    }, false);
    
    container.addEventListener("dragenter", function(event) {
      // highlight potential drop target when the draggable element enters it
      if (event.target.className == "todoContainer") {
        event.target.style.background = "purple";
      }
    }, false);
    
    container.addEventListener("dragleave", function(event) {
      // reset background of potential drop target when the draggable element leaves it
      if (event.target.className == "todoContainer") {
        event.target.style.background = "";
      }
    }, false);
    
    container.addEventListener("drop", function(event) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if (event.target.className == "todoContainer") {
        event.target.style.background = "";
        //swaping two elements by index in array that on screen
        swap_arr(event.target.id, draggedIndex);
      }
    }, false);

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

function done_button_trigger( childPlacement, deleted_todo_time){
    let indexToDelete = childPlacement.id;
    if(searchResultArr.length!=0){
        searchResultArr.splice(indexToDelete, 1);
        for(let i = 0; i < todoListArr.length; i++){
            if(todoListArr[i][1] === deleted_todo_time){ //delete task from the data todo list array.
            todoListArr.splice(i, 1);
            }
        }    
    } else {
        todoListArr.splice(indexToDelete, 1);
    }
    for(let i=indexToDelete;i<=todoListArr.length;i++){
        let index = i;
        if(document.getElementById(index)!=null)
            document.getElementById(index).setAttribute("id", i-1);
    }
    tasksList.removeChild(childPlacement);
    if(searchResultArr.length!=0){
        todoCounter = searchResultArr.length;
    } else {
        todoCounter = todoListArr.length;
    }
    counter.textContent = todoCounter;
    input.focus();
    index--;
}

function show_all_taskList(todoListArr){
    for(let i = 0; i< todoListArr.length; i++){
        show_task_on_screen(todoListArr[i][0], todoListArr[i][1], todoListArr[i][2], todoListArr[i][3])  // present the sorted list.
    } 
    input.focus();
    let index = 0;
    for(let i=0;i<=todoListArr.length;i++){
        if(document.getElementById(i)!=null){
            document.getElementById(i).setAttribute("id", index);
            index++;
        }
    }
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
    index = 0;
}

function search_button_trigger(text) {
    disable_Buttons_In_Search_Mode();
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
    searchResultArr = [];
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

