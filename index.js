document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearTasksBtn = document.getElementById('clearTasksBtn');
    const sortTasksBtn = document.getElementById('sortTasksBtn');
    let todos = [];
    addTaskBtn.addEventListener('click', addTask);
    clearTasksBtn.addEventListener('click', clearTasks);
    sortTasksBtn.addEventListener('click', sortTasks);
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText.length > 3 && taskText[0] === taskText[0].toUpperCase() && taskText.trim() !== '') {
            const newTodo = {
                id: generateUniqueId(),
                name: taskText,
                createdDate: new Date().toISOString(),
                completed: false
            };
            todos.push(newTodo);
            updateTaskList();
            taskInput.value = '';
        } else {
            alert('Error: Please enter a valid task. It must be more than three characters, not empty, and start with an uppercase letter.');
        }
    }
    function clearTasks() {
        todos = [];
        updateTaskList();
    }
    function sortTasks() {
        todos.sort((a, b) => a.name.localeCompare(b.name));
        updateTaskList();
    }
    window.removeTask = function (taskId) {
        todos = todos.filter(todo => todo.id !== taskId);
        updateTaskList();
    };
    function updateTaskList() {
        taskList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.setAttribute('data-id', todo.id);
            li.innerHTML = `
                <input type="checkbox" onchange="toggleCompleted(this, '${todo.id}')" ${todo.completed ? 'checked' : ''}>
                <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.name}</span>
                <button class="delete-btn" onclick="removeTask('${todo.id}')">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
    function toggleCompleted(checkbox, taskId) {
        const todo = todos.find(todo => todo.id === taskId);
        if (todo) {
            todo.completed = checkbox.checked;
            updateTaskList();
        }
    }
});