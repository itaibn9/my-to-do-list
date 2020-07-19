const tasksList = document.querySelector('ul');
const button = document.querySelector('button');
const input = document.querySelector('input');

button.addEventListener('click', function(){
  let inputValue = input.value;
  input.value = '';
  const container = document.createElement("div");
  container.setAttribute('class', 'todoContainer') ;
  const deleteButton = document.createElement("button");
  const task = document.createElement("li");
  task.setAttribute('class', 'todoText');
  const timeCreated = document.createElement("time");
  timeCreated.setAttribute('datetime', 'datetime');
  timeCreated.setAttribute('class', 'todoCreatedAt');
  let creationTime = new Date();
  let formatTime = creationTime.toISOString().replace('T',' ');
  timeCreated.innerHTML = formatTime;

  const priority = document.createElement('span');
  priority.setAttribute('class', 'todoPriority');
  let inputPriority = document.getElementById('prioritySelector').value;
  priority.textContent = inputPriority;



  tasksList.appendChild(container);
  task.textContent = inputValue;
  container.appendChild(task); 
  deleteButton.textContent = 'Delete';
  container.appendChild(deleteButton);
  container.appendChild(timeCreated);
  container.appendChild(priority);


  deleteButton.onclick = function(e){
    tasksList.removeChild(container);
}
input.focus();

})