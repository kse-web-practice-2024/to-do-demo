import ToDoList from './todo.js';

const raw = window.localStorage.getItem('todos');

const initialData = raw !== null ? JSON.parse(raw) : [];

const container = document.querySelector('.todo-list');
const list = new ToDoList(container, initialData);

list.subscribe(function(todo) {
    window.localStorage.setItem('todos', JSON.stringify(todo));
});



const form = document.querySelector('.todo');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const input = document.querySelector('.input-element-js');
    const { value } = input

    list.addTodo(value);

    input.value = "";
});



