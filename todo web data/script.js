const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const filters = document.querySelectorAll('.filters span');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos(filter = 'all') {
    taskList.innerHTML = '';
    todos.forEach((todo, index) => {
        if (filter === 'active' && todo.completed) return;
        if (filter === 'completed' && !todo.completed) return;

        const li = document.createElement('li');
        li.className = todo.completed ? 'checked' : '';
        li.innerHTML = `
            ${todo.text}
            <span onclick="deleteTodo(${index})">&times;</span>
        `;
        li.onclick = (e) => {
            if (e.target !== li) return;
            toggleTodo(index);
        };
        taskList.appendChild(li);
    });
}

function addTodo() {
    const text = taskInput.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    taskInput.value = '';
    saveTodos();
    renderTodos();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

addButton.addEventListener('click', addTodo);
taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addTodo();
});

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        renderTodos(filter.dataset.filter);
    });
});

renderTodos();