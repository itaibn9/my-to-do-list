
function add_todo_trigger(){
    todoCounter ++;
    counter.textContent = todoCounter; // process of the counter of the todo tasks.
    //getting the data from the field.
    let inputValue = input.value;
    input.value = '';
    let creationTime = new Date();
    let timePresentor = creationTime.getFullYear() + "-" + creationTime.getMonth() +
    "-" + creationTime.getDate() + " " + creationTime.getHours() + ":" +
     creationTime.getMinutes() + ":" + creationTime.getSeconds();
     const selectedPriority = inputPriority.value;
     // add todo data to array
     let todoTaskArr = [];
     todoTaskArr.push(selectedPriority);
     todoTaskArr.push(timePresentor);
     todoTaskArr.push(inputValue);
     todoListArr.push(todoTaskArr);

     show_task_on_screen(selectedPriority, timePresentor, inputValue);
}

function show_task_on_screen(todo_priority, time, text){
    const container = document.createElement("div");
    container.setAttribute('class', 'todoContainer');
    const deleteButton = document.createElement("button");
    const task = document.createElement("span");
    task.setAttribute('class', 'todoText');
    const timeCreated = document.createElement("span");
    timeCreated.setAttribute('class', 'todoCreatedAt');
    timeCreated.textContent = time;
    const priority = document.createElement('strong');
    priority.setAttribute('class', 'todoPriority');
    priority.textContent = todo_priority + " : ";
    tasksList.appendChild(container);
    task.textContent = " - " + text + " - ";
    container.appendChild(priority);
    deleteButton.textContent = 'Delete';
    container.appendChild(timeCreated);
    container.appendChild(task); 
    container.appendChild(deleteButton);
    
    deleteButton.addEventListener('click', function(){delete_button_trigger(container, time);});
    input.focus(); // getting back to focus on the input.
    if(todoCounter > 4)//feature reminder to complete your todo tasks;
    {
    alert("Come on start completing your tasks");
    }
}

function delete_button_trigger(childPlacement, deleted_todo_time){
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
        show_task_on_screen(todoListArr[i][0], todoListArr[i][1], todoListArr[i][2])  // present the sorted list.
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

addButton.addEventListener('click', add_todo_trigger);

// sorting button and function.
const sortButton = document.getElementById("sortButton");
sortButton.addEventListener('click', sortButtonTrigger);


