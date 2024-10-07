document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const pendingTasks = document.getElementById("pendingTasks");
  const completedTasks = document.getElementById("completedTasks");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const renderTasks = () => {
    pendingTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add(task.completed ? "completed" : "pending");

      taskItem.innerHTML = `
                <span>${task.text}</span>
                <span class="task-time">${
                  task.completed
                    ? "Completed at: " + task.completedAt
                    : "Added at: " + task.addedAt
                }</span>
                <div class="actions">
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
                    ${
                      !task.completed ? (
                        <button
                          class="complete-btn"
                          onclick="completeTask(${index})"
                        >
                          Complete
                        </button>
                      ) : (
                        ""
                      )
                    }
                </div>
            `;

      if (task.completed) {
        completedTasks.appendChild(taskItem);
      } else {
        pendingTasks.appendChild(taskItem);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = (taskText) => {
    const currentTime = new Date().toLocaleString();
    tasks.push({
      text: taskText,
      completed: false,
      addedAt: currentTime,
      completedAt: null,
    });
    renderTasks();
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      taskInput.value = "";
    }
  });

  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
  };

  window.editTask = (index) => {
    const newTaskText = prompt("Edit your task:", tasks[index].text);
    if (newTaskText !== null) {
      tasks[index].text = newTaskText.trim();
      renderTasks();
    }
  };

  window.completeTask = (index) => {
    tasks[index].completed = true;
    tasks[index].completedAt = new Date().toLocaleString();
    renderTasks();
  };

  renderTasks();
});
