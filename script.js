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
