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
