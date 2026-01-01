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
