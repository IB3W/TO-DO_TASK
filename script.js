let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';
let editIndex = null;
let deleteIndex = null;

const newTodoInput = document.getElementById('newTodo');
const errorMessage = document.getElementById('error-message');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const deleteDoneBtn = document.getElementById('deleteDoneBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');

const editModal = document.getElementById('editModal');
const editTodoInput = document.getElementById('editTodoInput');
const editErrorMessage = document.getElementById('edit-error-message');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

const deleteAllModal = document.getElementById('deleteAllModal');
const confirmDeleteAllBtn = document.getElementById('confirmDeleteAllBtn');
const cancelDeleteAllBtn = document.getElementById('cancelDeleteAllBtn');

const deleteDoneModal = document.getElementById('deleteDoneModal');
const confirmDeleteDoneBtn = document.getElementById('confirmDeleteDoneBtn');
const cancelDeleteDoneBtn = document.getElementById('cancelDeleteDoneBtn');

addBtn.addEventListener('click', addTodo);
newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const filter = e.target.getAttribute('data-filter');
        filterTodos(filter);
    });
});

deleteDoneBtn.addEventListener('click', deleteDoneTasks);
deleteAllBtn.addEventListener('click', deleteAllTasks);

saveEditBtn.addEventListener('click', saveEdit);
cancelEditBtn.addEventListener('click', () => closeModal(editModal));

confirmDeleteBtn.addEventListener('click', confirmDelete);
cancelDeleteBtn.addEventListener('click', () => closeModal(deleteModal));

confirmDeleteAllBtn.addEventListener('click', confirmDeleteAll);
cancelDeleteAllBtn.addEventListener('click', () => closeModal(deleteAllModal));

confirmDeleteDoneBtn.addEventListener('click', confirmDeleteDone);
cancelDeleteDoneBtn.addEventListener('click', () => closeModal(deleteDoneModal));

document.addEventListener('DOMContentLoaded', render);

function addTodo() {
    const text = newTodoInput.value.trim();

    if (text === '') {
        errorMessage.textContent = '⛔ Task cannot be empty';
        return;
    }
    if (text.length < 5) {
        errorMessage.textContent = '⛔ Task must be at least 5 characters long';
        return;
    }
    if (text[0] >= '0' && text[0] <= '9') {
        errorMessage.textContent = '⛔ Task cannot start with a number';
        return;
    }
    if (!/^[a-zA-Z0-9\s.,'!?-]+$/.test(text)) {
        errorMessage.textContent = '⛔ Task must contain only English characters';
        return;
    }

    errorMessage.textContent = '';
    todos.push({ text: text, done: false });
    saveToLocalStorage();
    newTodoInput.value = '';
    render();
    showMessage('Task added successfully 🎉', 'success');
}

function toggleTodo(index) {
    const actualIndex = getActualIndex(index);
    todos[actualIndex].done = !todos[actualIndex].done;
    saveToLocalStorage();
    render();
}

function openEdit(index) {
    editIndex = getActualIndex(index);
    editErrorMessage.textContent = '';
    editTodoInput.value = todos[editIndex].text;
    openModal(editModal);
}

function saveEdit() {
    const text = editTodoInput.value.trim();

    if (text.length < 5) {
        editErrorMessage.textContent = '⛔ Task must be at least 5 characters long';
        return;
    }

    todos[editIndex].text = text;
    saveToLocalStorage();
    closeModal(editModal);
    render();
    showMessage('Task has been edited.', 'success');
}

function deleteTodo(index) {
    deleteIndex = getActualIndex(index);
    openModal(deleteModal);
}

function confirmDelete() {
    todos.splice(deleteIndex, 1);
    saveToLocalStorage();
    closeModal(deleteModal);
    render();
    showMessage('Task has been deleted.', 'success');
}

function deleteAllTasks() {
    if (todos.length === 0) {
        showMessage('No tasks to delete.', 'info');
        return;
    }
    openModal(deleteAllModal);
}

function confirmDeleteAll() {
    todos = [];
    saveToLocalStorage();
    closeModal(deleteAllModal);
    render();
    showMessage('All tasks have been deleted.', 'success');
}

function deleteDoneTasks() {
    const doneTasks = todos.filter(todo => todo.done);
    if (doneTasks.length === 0) {
        showMessage('No done tasks to delete.', 'info');
        return;
    }
    openModal(deleteDoneModal);
}

function confirmDeleteDone() {
    todos = todos.filter(todo => !todo.done);
    saveToLocalStorage();
    closeModal(deleteDoneModal);
    render();
    showMessage('All done tasks have been deleted.', 'success');
}

function filterTodos(filter) {
    currentFilter = filter;
    
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(`[data-filter="${filter}"]`);
    activeButton.classList.add('active');
    
    render();
}

function render() {
    let filtered = todos;

    if (currentFilter === 'done') {
        filtered = todos.filter(todo => todo.done);
    } else if (currentFilter === 'todo') {
        filtered = todos.filter(todo => !todo.done);
    }

    if (filtered.length === 0) {
        todoList.innerHTML = 'No Tasks 📝';
        return;
    }

    todoList.innerHTML = '';
    
    filtered.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.done ? 'done' : ''}`;
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'todo-actions';
        
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle';
        toggleBtn.innerHTML = todo.done ? 
            '<i class="fa-regular fa-square-check"></i>' : 
            '<i class="fa-regular fa-square"></i>';
        toggleBtn.addEventListener('click', () => toggleTodo(index));
        
        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editBtn.addEventListener('click', () => openEdit(index));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.addEventListener('click', () => deleteTodo(index));
        
        actionsDiv.appendChild(toggleBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        
        li.appendChild(span);
        li.appendChild(actionsDiv);
        
        todoList.appendChild(li);
    });
}

function getActualIndex(filteredIndex) {
    let filtered = todos;
    if (currentFilter === 'done') {
        filtered = todos.filter(todo => todo.done);
    } else if (currentFilter === 'todo') {
        filtered = todos.filter(todo => !todo.done);
    }
    return todos.indexOf(filtered[filteredIndex]);
}

function openModal(modal) {
    modal.style.display = 'flex';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

function showMessage(text, type) {
    const container = document.querySelector('.container');
    const existing = container.querySelector('.message-box');
    
    if (existing) {
        container.removeChild(existing);
    }

    const box = document.createElement('div');
    box.className = `message-box ${type}`;
    box.textContent = text;
    
    container.appendChild(box);

    setTimeout(() => {
        if (box.parentNode) {
            container.removeChild(box);
        }
    }, 3000);
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}