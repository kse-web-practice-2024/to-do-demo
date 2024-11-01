function createTodoList(container, initialData = []) {
    const toDoList = initialData;

    const listeners = [];

    function createItem(title, done, index) {
        const li = document.createElement('li');
        li.innerHTML = ` <label><input type="checkbox" ${done ? 'checked' : ''} />${title} <button type="button" class="remove">x</button></label>`;
        li.className = done ? 'done' : '';
        li.setAttribute('data-index', index);
        return li;
    }

    function render() {
        container.innerHTML = "";
        toDoList.map((el, index) => {
            container.appendChild(createItem(el.value, el.done, index));
        });
    }

    function removeTodo(index) {
        toDoList.splice(index, 1);
        render();
        listeners.forEach((listener) => {
            listener(toDoList);
        });
    }

    function flip(index) {
        toDoList[index].done = !toDoList[index].done;
        listeners.forEach((listener) => {
            listener(toDoList);
        });
        render();
    }

    container.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            const li = e.target.closest('li');
            const index = li.getAttribute('data-index');
            flip(index);
        }
    });

    container.addEventListener('click', function(e) {
        if (e.target.type === 'button') {
            const li = e.target.closest('li');
            const index = li.getAttribute('data-index');
            removeTodo(index);
            e.preventDefault();
        }

    });

    render();

    return {
        addTodo: function(title) {
            toDoList.push({
                value: title,
                done: false
            });
            render();
            listeners.forEach((listener) => {
                listener(toDoList);
            });
        },
        subscribe: function(fn) {
            listeners.push(fn)
        }
    }
}

export default createTodoList;
