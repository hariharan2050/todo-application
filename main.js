document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.querySelector("#taskInput");
    const addTaskBtn = document.querySelector("#addTaskBtn");
    const taskList = document.querySelector("#taskList");
    const toggleTheme = document.querySelector("#toggleTheme");
    const filters = document.querySelectorAll(".filter");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let darkMode = localStorage.getItem("darkMode") === "enabled";

    // Apply dark mode if previously set
    if (darkMode) {
        document.body.classList.add("dark");
        toggleTheme.textContent = "☀️";
    }

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            if (filter === "completed" && !task.completed) return;
            if (filter === "pending" && task.completed) return;

            const li = document.createElement("li");
            li.classList.toggle("completed", task.completed);
            li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="complete" onclick="toggleComplete(${index})">✔️</button>
                    <button class="edit" onclick="editTask(${index})">✏EDIT</button>
                    <button class="delete" onclick="deleteTask(${index})">DELETE</button>
                </div>
            `;
            taskList.appendChild(li);
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            renderTasks();
        }
    });

    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    window.editTask = (index) => {
        const newTask = prompt("Edit task:", tasks[index].text);
        if (newTask) {
            tasks[index].text = newTask;
            renderTasks();
        }
    };

    toggleTheme.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        darkMode = !darkMode;
        toggleTheme.textContent = darkMode ? "☀️" : "🌙";
        localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
    });

    filters.forEach(button => {
        button.addEventListener("click", () => {
            filters.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            renderTasks(button.dataset.filter);
        });
    });

    renderTasks();
});
