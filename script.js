const todos = [];
const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function newTodo() {
    const task = prompt("Enter new TODO:");
    if (task) {
        const newTodoId = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
        const newTodo = { id: newTodoId, text: task, completed: false };
        todos.push(newTodo);
        render();
        updateCounters();
    }
}

function renderTodo(todo) {
    const checked = todo.completed ? 'checked' : '';
    const textStyle = todo.completed ? 'text-success text-decoration-line-through' : '';
    return `
        <li class="list-group-item" id="todo-${todo.id}">
            <input type="checkbox" class="form-check-input me-2" ${checked} onclick="checkTodo(${todo.id})" />
            <span class="${textStyle}">${todo.text}</span>
            <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
        </li>
    `;
}

function render() {
    const todoListHTML = todos.map(renderTodo).join('');
    list.innerHTML = todoListHTML;
}

function updateCounters() {
    const totalTodos = todos.length;
    const uncheckedTodos = todos.filter(todo => !todo.completed).length;
    itemCountSpan.textContent = totalTodos;
    uncheckedCountSpan.textContent = uncheckedTodos;
}

function deleteTodo(id) {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        render();
        updateCounters();
    }
}

function checkTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        render();
        updateCounters();
    }
}

render();
updateCounters();
