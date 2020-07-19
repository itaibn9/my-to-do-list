// control section:
const counter = document.getElementById("counter");
let todoCounter = 0;
counter.textContent = todoCounter;

// view section:
const tasksList = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.querySelector('input');

button.addEventListener('click', function(){
    todoCounter ++;
    counter.textContent = todoCounter;

  let inputValue = input.value;
  input.value = '';
  const container = document.createElement("div");
  container.setAttribute('class', 'todoContainer') ;
  const deleteButton = document.createElement("button");
  const task = document.createElement("span");
  task.setAttribute('class', 'todoText');
  const timeCreated = document.createElement("time");
  timeCreated.setAttribute('datetime', 'datetime');
  timeCreated.setAttribute('class', 'todoCreatedAt');
  let creationTime = new Date();
  let formatTime = creationTime.toISOString().replace('T',' ');
  timeCreated.innerHTML = formatTime;

  const priority = document.createElement('strong');
  priority.setAttribute('class', 'todoPriority');
  let inputPriority = document.getElementById('prioritySelector').value;
  priority.textContent = inputPriority + " : ";
  inputPriority.value = 1;


  tasksList.appendChild(container);
  task.textContent = inputValue + " ";
  container.appendChild(priority);
  container.appendChild(task); 
  deleteButton.textContent = 'Delete';
  container.appendChild(timeCreated);
  container.appendChild(deleteButton);


  deleteButton.onclick = function(e){
    tasksList.removeChild(container);
    todoCounter --;
    counter.textContent = todoCounter;
}
input.focus();

})

