//! Declare variable and tag use in this file
var Todo_Click = [];

const Todolist = document.querySelector('.todolist');
var todo_input = document.querySelector('#todo_input');
const add_btn = document.querySelector('#add_btn');
const edit_btn = document.querySelector('#edit_btn');
const delete_btn = document.querySelector('#delete_btn');
const update_btn = document.querySelector('#update_btn');
const alert_text = document.querySelector('#alert_text');

//! Lock edit button and update button when window loaded
window.addEventListener('load',()=>{
    Lock_Edit();
    Lock_Update();
});

//! Function to load todo (get todo from LocalStorage) and show on 
document.addEventListener('DOMContentLoaded', GetTodo);

//! Function to load todo (get todo from LocalStorage)
function GetTodo(){
    let todo_array;
    localStorage.getItem('todo_array') === null ? todo_array = [] : todo_array = JSON.parse(localStorage.getItem('todo_array'));
    todo_array.forEach(function(TodoText){
        // Declare new tag use for new todo
        var NewLi = document.createElement('li');
        var NewP = document.createElement('p');
        var NewSpan = document.createElement('span');
        var NewCheckbox = document.createElement('input');
        
        // Add class for new tag
        NewP.classList.add("todo_content");
        NewP.innerHTML = TodoText;
        NewSpan.classList.add("todo_bf");
        NewCheckbox.type = "checkbox";
        NewCheckbox.classList.add("check_todo");

        // Add new tag to todolist
        NewLi.appendChild(NewSpan);
        NewLi.appendChild(NewP);
        NewLi.appendChild(NewCheckbox);

        Todolist.insertBefore(NewLi, Todolist.firstChild);
    });
}

//! Get event and custom todo when user click on checkbox
document.addEventListener('click',(e)=>{
    var UserClick = e.target;
    if(UserClick.classList.contains("check_todo")){
        Custom_SelectTodo(UserClick);
        Todo_Userclick(UserClick);
    }

    Todo_Click.length != 0 ? Lock_Add() : Unlock_Add();
    Todo_Click.length == 1 ? Unlock_Edit() : Lock_Edit();  
});

//! Function to custom todo when user click on checkbox
function Custom_SelectTodo(e){
    var todo = e.parentNode;
    var todo_bf = todo.children[0];
    if(e.checked == true){
        todo_bf.style.backgroundColor = 'var(--my-yellow)';
        todo.style.color = 'var(--my-yellow)';
        todo.style.backgroundColor = 'var(--my-black)';
    }
    else{
        todo_bf.style.backgroundColor = 'var(--my-blue)';
        todo.style.color = 'var(--my-blue)';
        todo.style.backgroundColor = 'var(--my-white)';
    }
}

//! This function help to add Todo - what user click on to new temp array
function Todo_Userclick(e){
    e.checked == true ? Todo_Click.push(e.parentElement) : Todo_Click.splice(Todo_Click.indexOf(e.parentElement),1);
}

//! Function to add todo (show todo)
function Add_Todo(){
    // Get value input from user 
    var content = todo_input.value;

    if(content==""){
        alert_text.innerHTML = "Vui lòng nhập nội dung của ghi chú!!!";
    }
    else{
        // Declare new tag use for new todo
        var NewLi = document.createElement('li');
        var NewP = document.createElement('p');
        var NewSpan = document.createElement('span');
        var NewCheckbox = document.createElement('input');
        
        // Add class for new tag
        NewP.classList.add("todo_content");
        NewP.innerHTML = content;
        NewSpan.classList.add("todo_bf");
        NewCheckbox.type = "checkbox";
        NewCheckbox.classList.add("check_todo");

        // Add new tag to todolist
        NewLi.appendChild(NewSpan);
        NewLi.appendChild(NewP);
        NewLi.appendChild(NewCheckbox);
        Todolist.appendChild(NewLi);

        // Save TodoText (use Local Storage)
        Add_LS(todo_input.value);

        // Reset todo input
        todo_input.value = "";
        alert_text.innerHTML = "";
    }
}

//! Function to add todo to LocalStorage
function Add_LS(todo){
    let todo_array;
    localStorage.getItem('todo_array') === null ? todo_array = [] : todo_array = JSON.parse(localStorage.getItem('todo_array'));
    todo_array.unshift(todo);
    localStorage.setItem('todo_array', JSON.stringify(todo_array));
}

//! Get event and add todo
add_btn.addEventListener('click',()=>{
    Add_Todo();
});

//! This function use when user click on edit button
function Edit_Todo(){
    var Todo = Todo_Click[0];
    var Todotext = Todo.children[1].textContent;
    todo_input.value = Todotext;
    todo_input.focus();
    Lock_Edit();
}

//! This function use when user click on update button
function Update_Todo(){
    var Todo = Todo_Click[0];
    var Todotext = Todo.children[1].textContent;
    Edit_LS(Todotext, todo_input.value);
    Todo.children[1].textContent = todo_input.value;
    todo_input.value = null;
    Todo.children[0].style.backgroundColor = 'var(--my-blue)';
    Todo.style.color = 'var(--my-blue)';
    Todo.style.backgroundColor = 'var(--my-white)';
    Todo.children[2].checked = false;
    Todo_Click = [];
    Lock_Update();
}

//! Function to edit Todotext in LocalStorage
function Edit_LS(a, b){
    let todo_array = JSON.parse(localStorage.getItem('todo_array'));
    todo_array[todo_array.indexOf(a)] = b;
    localStorage.setItem('todo_array', JSON.stringify(todo_array));
}

//! Get event edit button clicked
edit_btn.addEventListener('click',()=>{
    Unlock_Update();
    Lock_Delete();
    Edit_Todo();
});

//! Get event update button clicked
update_btn.addEventListener('click',()=>{
    Update_Todo();
    Unlock_Delete();
});

//! Function to delete Todo 
function Delete_Todo(){
    var Todo = document.querySelectorAll('li');
    for(let i=0;i<Todo_Click.length;i++){
        for (let j=0;j<Todo.length;j++){
            if(Todo[j].children[1].textContent == Todo_Click[i].children[1].textContent){
                Todolist.removeChild(Todo[j]);
                Delete_LS(Todo[j]);
            }
        }
    }
    Todo_Click = [];
}

//! Function to delete Todotext in LocalStorage
function Delete_LS(todo){
    let todo_array = JSON.parse(localStorage.getItem('todo_array'));
    TodoText = todo.children[1].innerText;
    todo_array.splice(todo_array.indexOf(TodoText), 1);
    localStorage.setItem('todo_array', JSON.stringify(todo_array));
}

//! Get event and delete todo
delete_btn.addEventListener('click',()=>{
    Delete_Todo();
});

//! These function help lock or unlock and custom button
function Lock_Add(){
    add_btn.style.opacity = '0.5';
    add_btn.style.cursor = 'default';
    add_btn.disabled = true;
}

function Unlock_Add(){
    add_btn.style.opacity = '1';
    add_btn.style.cursor = 'pointer';
    add_btn.disabled = false;
}

function Lock_Edit(){
    edit_btn.style.opacity = '0.5';
    edit_btn.style.cursor = 'default';
    edit_btn.disabled = true;
}

function Unlock_Edit(){
    edit_btn.style.opacity = '1';
    edit_btn.style.cursor = 'pointer';
    edit_btn.disabled = false;
}

function Lock_Update(){
    update_btn.style.opacity = '0.5';
    update_btn.style.cursor = 'default';
    update_btn.disabled = true;
}

function Unlock_Update(){
    update_btn.style.opacity = '1';
    update_btn.style.cursor = 'pointer';
    update_btn.disabled = false;
}

function Lock_Delete(){
    delete_btn.style.opacity = '0.5';
    delete_btn.style.cursor = 'default';
    delete_btn.disabled = true;
}

function Unlock_Delete(){
    delete_btn.style.opacity = '1';
    delete_btn.style.cursor = 'pointer';
    delete_btn.disabled = false;
}