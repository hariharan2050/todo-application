document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.querySelector("#taskInput");
  const addTaskBtn = document.querySelector("#addTaskBtn");
  const taskList = document.querySelector("#taskList");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
              <span>${task}</span>
              <div class="task-buttons">
                  <button class="edit" onclick="editTask(${index})">Edit</button>
                  <button class="delete" onclick="deleteTask(${index})">Delete</button>
              </div>
          `;
          taskList.appendChild(li);
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addTaskBtn.addEventListener("click", () => {
      const task = taskInput.value.trim();
      if (task !== "") {
          tasks.push(task);
          taskInput.value = "";
          renderTasks();
      }
  });

  window.deleteTask = (index) => {
      tasks.splice(index, 1);
      renderTasks();
  };

  window.editTask = (index) => {
      const newTask = prompt("Edit task:", tasks[index]);
      if (newTask) {
          tasks[index] = newTask;
          renderTasks();
      }
  };

  renderTasks();
});
