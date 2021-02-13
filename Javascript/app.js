//! Declare variable and tag use in this file
let count=0;

const Todolist = document.querySelector('.todolist');
var todo_input = document.querySelector('#todo_input');
const add_btn = document.querySelector('#add_btn');
const edit_btn = document.querySelector('#edit_btn');
const delete_btn = document.querySelector('#delete_btn');
const update_btn = document.querySelector('#update_btn');
const alert_text = document.querySelector('#alert_text');

//! Custom edit_btn is disabled
edit_btn.style.opacity = '0.5';
edit_btn.style.cursor = 'default';
edit_btn.disabled = true;
update_btn.style.opacity = '0.5';
update_btn.style.cursor = 'default';
update_btn.disabled = true;

//! Function to load todo (get todo from LocalStorage) and show on 
document.addEventListener('DOMContentLoaded', GetTodo);

//! Get event and custom todo when user click on checkbox
document.addEventListener('click',(e)=>{
    var UserClick = e.target;
    if(UserClick.classList.contains("check_todo")){
        Custom_SelectTodo(UserClick);
    }
});

edit_btn.addEventListener('click',()=>{
    var CheckBox = document.querySelectorAll('.check_todo');
    update_btn.style.opacity = '1';
    update_btn.style.cursor = 'pointer';
    update_btn.disabled = false;
    edit_btn.style.opacity = '0.5';
    edit_btn.style.cursor = 'default';
    edit_btn.disabled = true;

    for (let i=0;i<CheckBox.length;i++){
        if(CheckBox[i].checked == true){
            var Todo = CheckBox[i].parentElement;
            var TodoText = Todo.children[1].textContent;
            todo_input.value = TodoText;
            update_btn.addEventListener('click',()=>{
                Todo.children[1].textContent = todo_input.value;
                Edit_LS(TodoText,todo_input.value);
                todo_input.value = "";
                Todo.children[0].style.backgroundColor = 'var(--my-blue)';
                Todo.style.color = 'var(--my-blue)';
                Todo.style.backgroundColor = 'var(--my-white)';
                CheckBox[i].checked = false;
            });
        }
    }
});

//! Get event and add todo
add_btn.addEventListener('click',()=>{
    Add_Todo();
});

//! Get event and delete todo
delete_btn.addEventListener('click',()=>{
    var CheckBox = document.querySelectorAll('.check_todo');
    for (let i=0;i<CheckBox.length;i++){
        if(CheckBox[i].checked == true){
            count--;
            Delete_LS(CheckBox[i].parentElement);
            CheckBox[i].parentElement.classList.add('delete_animation');
            CheckBox[i].parentElement.addEventListener('transitionend',()=>{
                CheckBox[i].parentElement.remove();
            })
        }
    }
    if(count==1){
        edit_btn.style.opacity = '1';
        edit_btn.style.cursor = 'pointer';
        edit_btn.disabled = false;
    }else{
        edit_btn.style.opacity = '0.5';
        edit_btn.style.cursor = 'default';
        edit_btn.disabled = true;
    }
});

//! Function to load todo (get todo from LocalStorage)

function GetTodo(){
    let todo_array;
    if (localStorage.getItem('todo_array') === null){
        todo_array = [];
    }
    else{
        todo_array = JSON.parse(localStorage.getItem('todo_array'));
    }
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

//! Function to delete Todo 

function Delete_Todo(e){
    var Todo = e.parentNode;
    Delete_LS(Todo);
    Todo.remove();
}

//! Function to custom todo when user click on checkbox

function Custom_SelectTodo(e){
    var todo = e.parentNode;
    var todo_bf = todo.children[0];
    if(e.checked == true){
        count++;
        todo_bf.style.backgroundColor = 'var(--my-yellow)';
        todo.style.color = 'var(--my-yellow)';
        todo.style.backgroundColor = 'var(--my-black)';
        console.log(count);
    }
    else{
        count--;
        todo_bf.style.backgroundColor = 'var(--my-blue)';
        todo.style.color = 'var(--my-blue)';
        todo.style.backgroundColor = 'var(--my-white)';
        console.log(count);
    }
    if(count==1){
        edit_btn.style.opacity = '1';
        edit_btn.style.cursor = 'pointer';
        edit_btn.disabled = false;
    }else{
        edit_btn.style.opacity = '0.5';
        edit_btn.style.cursor = 'default';
        edit_btn.disabled = true;
    }
}

//! Function to save todo (use LocalStorage)

function Add_LS(todo){
    let todo_array;
    if (localStorage.getItem('todo_array') === null){
        todo_array = [];
    }
    else{
        todo_array = JSON.parse(localStorage.getItem('todo_array'));
    }
    todo_array.unshift(todo);
    localStorage.setItem('todo_array', JSON.stringify(todo_array));
}

//! Function to edit Todotext in LocalStorage

function Edit_LS(a, b){
    let todo_array = JSON.parse(localStorage.getItem('todo_array'));
    todo_array[todo_array.indexOf(a)] = b;
    localStorage.setItem('todo_array', JSON.stringify(todo_array));
}

//! Function to delete Todotext in LocalStorage

function Delete_LS(todo){
    let todo_array = JSON.parse(localStorage.getItem('todo_array'));
    TodoText = todo.children[1].innerText;
    todo_array.splice(todo_array.indexOf(TodoText), 1);
    localStorage.setItem('todo_array', JSON.stringify(todo_array));
}