import { createItem } from './to-to-item.js'


class ToDoList {
    #toDoList;
    #listeners = [];
    #container;

    constructor(container, initialData = []) {
        this.#container = container;
        this.#toDoList = initialData;

        container.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const li = e.target.closest('li');
                const index = li.getAttribute('data-index');
                this.#flip(index);
            }
        });

        container.addEventListener('click', (e) => {
            if (e.target.type === 'button') {
                const li = e.target.closest('li');
                const index = li.getAttribute('data-index');
                this.#removeTodo(index);
                e.preventDefault();
            }

        });

        this.#render()
    }


    #render() {
        this.#container.innerHTML = "";
        this.#toDoList.map((el, index) => {
            this.#container.appendChild(createItem(el.value, el.done, index));
        });
    }

    #removeTodo(index) {
        this.#toDoList.splice(index, 1);
        this.#render();
        this.#listeners.forEach((listener) => {
            listener(this.#toDoList);
        });
    }

    #flip(index) {
        this.#toDoList[index].done = !this.#toDoList[index].done;
        this.#listeners.forEach((listener) => {
            listener(this.#toDoList);
        });

        const currentElement = this.#container.querySelector(`[data-index="${index}"]`);
        currentElement.classList.toggle('done');
    }

    addTodo(title) {
        this.#toDoList.push({
            value: title,
            done: false
        });
        this.#render();
        this.#listeners.forEach((listener) => {
            listener(this.#toDoList);
        });
    }

    subscribe(fn) {
        this.#listeners.push(fn)
    }

}

export default ToDoList;
