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
