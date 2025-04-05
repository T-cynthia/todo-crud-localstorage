document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    const clearAllBtn = document.getElementById("clear-all");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const card = document.createElement("div");
        card.className = "task-card";
        card.style.backgroundColor = task.bg;
  
        card.innerHTML = `
          <h3>${task.name} - <small>${task.type}</small></h3>
          <p>${task.desc}</p>
          <div class="actions">
            <button onclick="editTask(${index})">✏️ Edit</button>
            <button onclick="deleteTask(${index})">❌ Delete</button>
          </div>
        `;
  
        taskList.appendChild(card);
      });
    }
  
    window.editTask = function(index) {
      const task = tasks[index];
      document.getElementById("task-id").value = index;
      document.getElementById("task-name").value = task.name;
      document.getElementById("task-type").value = task.type;
      document.getElementById("task-desc").value = task.desc;
      document.getElementById("task-bg").value = task.bg;
    }
  
    window.deleteTask = function(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = document.getElementById("task-id").value;
      const name = document.getElementById("task-name").value;
      const type = document.getElementById("task-type").value;
      const desc = document.getElementById("task-desc").value;
      const bg = document.getElementById("task-bg").value;
  
      const task = { name, type, desc, bg };
  
      if (id === "") {
        tasks.push(task);
      } else {
        tasks[+id] = task;
      }
  
      saveTasks();
      renderTasks();
      form.reset();
      document.getElementById("task-id").value = "";
    });
  
    clearAllBtn.addEventListener("click", () => {
      tasks = [];
      saveTasks();
      renderTasks();
    });
  
    renderTasks();
  });
  