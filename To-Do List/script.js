document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const categorySelect = document.getElementById('category');
    const addTaskBtn = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const toggleThemeBtn = document.getElementById('toggle-theme');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Render tasks
    const renderTasks = () => {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task.name} - <em>${task.category}</em></span>
          <div>
            <button data-index="${index}" class="edit-task">Edit</button>
            <button data-index="${index}" class="delete-task">Delete</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    };
  
    // Add task
    addTaskBtn.addEventListener('click', () => {
      const taskName = taskInput.value.trim();
      const category = categorySelect.value;
  
      if (taskName) {
        tasks.push({ name: taskName, category });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
      }
    });
  
    // Edit and delete tasks
    taskList.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
  
      if (e.target.classList.contains('delete-task')) {
        tasks.splice(index, 1);
      } else if (e.target.classList.contains('edit-task')) {
        const newTask = prompt('Edit your task:', tasks[index].name);
        if (newTask !== null) {
          tasks[index].name = newTask.trim();
        }
      }
  
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });
  
    // Toggle theme
    toggleThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
    });
  
    // Initial render
    renderTasks();
  });
  