// select specific structures
const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

loadItems();
eventListeners();

function eventListeners() {
    // submit event
    form.addEventListener("submit", addNewItem);
    // delete an item
    taskList.addEventListener("click", deleteItem);
    // delete all item
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    });
}

// get items from local storage
function getItemsFromLS() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

// set item to local storage
function setItemToLS(newTodo) {
    todos = getItemsFromLS();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// create html structure
function createItem(newTodo) {

    // create li
    const li = document.createElement("li");
    li.className = "list-group-item rounded border-0 mt-1";
    li.appendChild(document.createTextNode(newTodo));

    // create a
    const a = document.createElement("a");
    a.className = "text-dark delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = '<i class="fas fa-times"></i>';

    li.appendChild(a);
    taskList.appendChild(li);
}

// add new item with form
function addNewItem(e) {

    if (input.value === '') {
        alert("Task name can't be empty!")
    } else {
        // create the Item
        createItem(input.value);

        // add item in local storage
        setItemToLS(input.value);

        input.value = '';
    }


    //sayfanin yenilenmemesi icin
    e.preventDefault();
}

function deleteItem(e) {
    //  carpiya tıklandigini check etme
    if (e.target.className === 'fas fa-times') {
        //if (confirm("Do you want to delete the item?")) {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromLS(e.target.parentElement.parentElement.textContent);
        //}
    }
    e.preventDefault();
}

function deleteTodoFromLS(deleteTodo) {
    let todos = getItemsFromLS();

    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteAllItems(e) {
    //if (confirm("Do you want to delete all items?")) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear all items in local storage
    localStorage.clear();
    //}
}