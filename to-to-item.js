export class ToDoItem {
    #title;
    #done;
    #element;
    #removeCallback
    #changeCallback
    #ref

    constructor(title, done, index) {
        this.#title = title;
        this.#done = done;
        this.#ref = index.toString();

        this.#element = document.createElement('li');
        this.#element.innerHTML = `
            <label>
               <input type="checkbox" ${done ? 'checked' : ''} />
                ${title}
            </label>
           <button type="button" class="remove">x</button>
        `;
        this.#element.className = done ? 'done' : '';

        this.#element.querySelector('button').addEventListener('click', (event) => {
            this.#removeCallback(this.#ref);
            event.preventDefault();
        });

        this.#element.addEventListener('click', (event) => {
            this.#changeCallback(this.#ref);
            event.preventDefault();
        })

    }

    onRemove(removeCallback) {
        this.#removeCallback = removeCallback;
    }

    onChange(changeCallback) {
        this.#changeCallback = changeCallback;
    }

    get ref() {
        return this.#ref
    }

    set done(done) {
        this.#done = done;
        if (this.#done) {
            this.#element.classList.add('done');
            this.#element.querySelector('input').setAttribute('checked', 'checked');
        } else {
            this.#element.classList.remove('done');
            this.#element.querySelector('input').removeAttribute('checked');
        }
    }

    get done() {
        return this.#done;
    }

    get element() {
        return this.#element;
    }

    get value() {
        return this.#title;
    }
}

ToDoItem.prototype.toJSON = function() {
    return {
        value: this.value,
        done: this.done
    }
}
