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

