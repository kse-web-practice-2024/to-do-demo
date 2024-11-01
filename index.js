const form = document.querySelector('.todo');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const input = document.querySelector('.input-element-js');
    const { value } = input
    const li = document.createElement('li');
    li.innerHTML = ` <label><input type="checkbox" />${value} <button type="button" class="remove">x</button></label>`;

    const todo = document.querySelector('.todo-list');
    todo.appendChild(li);
    input.value = "";
});


const listRoot = document.querySelector('.todo-list');
listRoot.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox') {
        e.target.closest('li').classList.toggle('done')
    }
});

listRoot.addEventListener('click', function(e) {
    if (e.target.type === 'button') {
        e.target.closest('li').remove();
    }
    e.preventDefault();
});



/**
 *<li>
 *  <label>
 *  <input type="checkbox" />
 *    some value
 *  </label>
 * </li>
 */
