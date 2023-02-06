let day = document.getElementById('day')
let mon = document.getElementById('month')
let year = document.getElementById('year')
let dayText = document.getElementById('day-text')
let bottom = document.getElementById('bottom')
let container = document.getElementById('container')
let save = document.querySelector('#save')
let todoInput = document.getElementById('input')
let cancel = document.querySelector('#cancel')
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const todoList = document.querySelector('.todo-list')
//Eventlistners
document.addEventListener('DOMContentLoaded', getTodos)
cancel.addEventListener('click', cancelInput)
bottom.addEventListener('click', showInput)
save.addEventListener('click', saveInput)
todoList.addEventListener('click', deleteCheck)

//Functions

function load() {
 let date = new Date();
 let month = months[date.getMonth()];
 let daye = days[date.getDay()]
 mon.innerHTML = month
 dayText.innerHTML = daye
 day.innerHTML = date.getDate()
 year.innerHTML = date.getFullYear()
}

load()

function showInput() {
 let main = document.getElementById('main')
 main.style.display = 'block'
}

function cancelInput(){
  main.style.display = 'none'
}

function saveInput() {
 const todoDiv = document.createElement('div')
 todoDiv.classList.add('todo')
 const newTodo = document.createElement('li')
 newTodo.innerHTML = todoInput.value
 newTodo.classList.add('todo-item')
 todoDiv.appendChild(newTodo)
 todoList.appendChild(todoDiv)
 
 saveLocalTodos(todoInput.value)
 
 //complete btn 
 const completedButton = document.createElement('button')
 completedButton.innerHTML = '<i class="fa-solid fa-square-check"></i> '
 completedButton.classList.add('complete-btn')
 todoDiv.appendChild(completedButton)
 
 // trash btn
 const trashButton = document.createElement('button')
 trashButton.innerHTML = '<i class="fa-solid fa-trash"></i> '
 trashButton.classList.add('delete-btn')
 todoDiv.appendChild(trashButton)

 // clear input
 todoInput.value = ''
}


function deleteCheck(e){
 const item = e.target
 
 
 if (item.classList[0] === "delete-btn") {
  const todo = item.parentElement 
  todo.classList.add('fall')
  removeLocalTodos(todo)
  todo.addEventListener('click', function(){
   todo.remove()
  })
 }
 if (item.classList[0] === "complete-btn") {

        const todo = item.parentElement

        todo.classList.toggle('completed')
    }
 }

function saveLocalTodos(todo) {
    // check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        const newTodo = document.createElement('li')
        newTodo.innerHTML = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
        //complete btn
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fa-solid fa-square-check"></i> '
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        // trash btn
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>  '
        trashButton.classList.add('delete-btn')
        todoDiv.appendChild(trashButton)
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex, 1))
    localStorage.setItem('todos', JSON.stringify(todos))

}