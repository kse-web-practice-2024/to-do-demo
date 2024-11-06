export function createItem(title, done, index) {
    const li = document.createElement('li');
    li.innerHTML = ` <label><input type="checkbox" ${done ? 'checked' : ''} />${title} <button type="button" class="remove">x</button></label>`;
    li.className = done ? 'done' : '';
    li.setAttribute('data-index', index);
    return li;
}
