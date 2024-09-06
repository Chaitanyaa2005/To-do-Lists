const alert = document.querySelector(".alert");
const form = document.querySelector(".list-form");
const task = document.querySelector(".task");
const submitBtn = document.querySelector(".submit-btn");
const taskList = document.querySelector(".task-list");
const taskItem = document.querySelector(".task-item");

let editElement;
let editFlag = false;
let editId = "";

form.addEventListener("submit",addTask);

function addTask(e){
    e.preventDefault();
    const tasks = task.value;
    const id = new Date().getTime();
    if(tasks!=='' && editFlag === false){
        const newTask = document.createElement('article');
        newTask.classList.add('.task-items');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        newTask.setAttributeNode(attr);
        newTask.innerHTML = `<p class="taskes">${tasks}</p>
        <button class="edit-btn">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
       <button class="delete-btn">
        <i class="fas fa-trash"></i>
        </button>
         </div>`;

    const deleteBtn = newTask.querySelector('.delete-btn');
    const editBtn = newTask.querySelector('.edit-btn');

    deleteBtn.addEventListener("click",deleteTask);
    editBtn.addEventListener("click",editTask);

    function deleteTask(e){
      const newTask = e.currentTarget.parentElement;
      taskItem.removeChild(newTask);

      displayAlert('Task removed',"failure");
    }
    function editTask(e){ 
       const newTask = e.currentTarget.parentElement;
       editElement = e.currentTarget.previousElementSibling;
       task.value = editElement.innerHTML;
       editFlag = true;
       submitBtn.textContent = "edit";
    }


        taskItem.appendChild(newTask);
        displayAlert('Task added to the To-do-list', "success");
        taskItem.classList.add(".show-list");
        
         setBackToDefault();
    }
    else if(tasks !=='' && editFlag === true){
        editElement.innerHTML = tasks;
        displayAlert('Value changed','success');

        setBackToDefault();
    }
    else{
        displayAlert("Please enter task","failure");
    }
}
// display of alert
 function displayAlert(text,action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
 // removal of alert

 setTimeout(function(){
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
 },1000);
 }

 function setBackToDefault() {
    task.value = "";
    editFlag = false;
    editId = "";
    submitBtn.textContent = "Submit";
 }