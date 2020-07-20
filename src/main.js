
function add_todo_trigger(){
    todoCounter ++;
    counter.textContent = todoCounter + " "; // process of the counter of the todo tasks.
    //getting the data from the field.
    let inputValue = input.value;
    input.value = '';
    let creationTime = new Date().toISOString().substr(0,18);
    let timePresentor = creationTime.replace("T", " Created At: ")
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
    const container = document.createElement("div");
    container.setAttribute('class', 'todoContainer');
    const doneButton = document.createElement("button");
    doneButton.setAttribute('class', 'done_button');
    const task = document.createElement("i");
    task.setAttribute('class', 'todoText');
    const timeCreated = document.createElement("span");
    timeCreated.setAttribute('class', 'todoCreatedAt');
    timeCreated.textContent =time;
    const priority = document.createElement('strong');
    priority.setAttribute('class', 'todoPriority');
    priority.textContent = todo_priority + " : ";
    const dateExpire = document.createElement("strong");
    dateExpire.setAttribute('class', 'experassion_day');
    if(date === ''){dateExpire.textContent = "No due time"}
    else{dateExpire.textContent = "until: " + date + " ";}
    tasksList.appendChild(container);
    if(text === "" || text === " " || text === "  "){text = "you didn't insert a Todo task"};
    task.textContent = " - " + text + " - ";
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
    input.focus(); // getting back to focus on the input.
    if(todoCounter > 5)//feature reminder to complete your todo tasks;
    {
    alert("Come on start completing your tasks");
    }
   
}

function done_button_trigger(childPlacement, deleted_todo_time){
    tasksList.removeChild(childPlacement);
    todoCounter --;
    counter.textContent = todoCounter;
    for(let i = 0; i < todoListArr.length; i++){
        if(todoListArr[i][1] === deleted_todo_time) //delete task from the data todo list array.
        { todoListArr.splice(i, 1); }
    }
}


function sortButtonTrigger(){  
    clean_presented_list();
    todoListArr = todoListArr.sort(); // sorts the list
    for(let i = todoListArr.length - 1; i >= 0; i--){
        show_task_on_screen(todoListArr[i][0], todoListArr[i][1], todoListArr[i][2], todoListArr[i][3])  // present the sorted list.
    } 
    }

function clean_presented_list() {
    while(tasksList.firstChild){
        tasksList.removeChild(tasksList.lastChild); // first it cleans the shown list;
    }
}
// control section:
const counter = document.getElementById("counter");
let todoCounter = 0;
counter.textContent = todoCounter; 
let todoListArr = []; // array of all the to do list tasks.
const inputPriority = document.getElementById('prioritySelector');
// view section:
const tasksList = document.querySelector('ul');
const addButton = document.getElementById('addButton');
const input = document.querySelector('input');
const dueDateInput = document.getElementById("dueTime");
addButton.addEventListener('click', add_todo_trigger);

// sorting button and function.
const sortButton = document.getElementById("sortButton");
sortButton.addEventListener('click', sortButtonTrigger);


