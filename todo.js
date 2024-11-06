import { ToDoItem } from './to-to-item.js'


class ToDoList {
    #toDoList;
    #listeners = [];
    #container;

    constructor(container, initialData = []) {
        this.#container = container;
        this.#toDoList = initialData.map(({value, done}, index) => {
            const todoItem = new ToDoItem(value, done, index);

            todoItem.onRemove((ref) => {
                this.#removeTodo(ref)
            });

            todoItem.onChange((ref) => {
                this.#flip(ref);
            });

            return todoItem;
        });

        this.#render()
    }

    #render() {
        this.#container.innerHTML = "";
        this.#toDoList.forEach(el => this.#container.appendChild(el.element));
    }

    #removeTodo(index) {
        const indexToRemove = this.#toDoList.findIndex(({ref}) => ref === index);

        if (indexToRemove === -1) {
            return;
        }

        this.#toDoList.splice(indexToRemove, 1);
        this.#render();
        this.#listeners.forEach((listener) => {
            listener(this.#toDoList);
        });
    }

    #flip(index) {
        const indexToFlip = this.#toDoList.findIndex(({ref}) => ref === index);

        if (indexToFlip === -1) {
            return;
        }

        this.#toDoList[indexToFlip].done = !this.#toDoList[indexToFlip].done;
        this.#listeners.forEach((listener) => {
            listener(this.#toDoList);
        });
    }

    addTodo(title) {
        const index = this.#toDoList.length;
        const todoItem = new ToDoItem(title, false, index);
        todoItem.onRemove((ref) => {
            this.#removeTodo(ref)
        });

        todoItem.onChange((ref) => {
            this.#flip(ref);
        });

        this.#toDoList.push(todoItem);
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
