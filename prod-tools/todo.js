document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://productintaebackend1-0.onrender.com";
    const todoListContainer = document.querySelector("#to-dolist");
    const inputForm = document.createElement("form");
    inputForm.innerHTML = `
        <input type="text" id="task-input" placeholder="Add a new task..." required />
        <button type="submit">Add Task</button>
    `;
    document.body.insertBefore(inputForm, todoListContainer);

    async function fetchTasks() {
        const response = await fetch(`${API_URL}/tasks`);
        const tasks = await response.json();
        tasks.forEach(renderTask);
    }

    function renderTask(task) {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.dataset.id = task.id;
        taskElement.innerHTML = `
            <input type="checkbox" ${task.status === "done" ? "checked" : ""} />
            <span>${task.description}</span>
            <button class="delete-btn">Delete</button>
        `;
        todoListContainer.appendChild(taskElement);
    }

    inputForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const taskInput = document.getElementById("task-input");
        const newTask = { description: taskInput.value, status: "pending" };

        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask),
        });

        const savedTask = await response.json();
        renderTask(savedTask);
        taskInput.value = "";
    });

    todoListContainer.addEventListener("click", async (e) => {
        const taskElement = e.target.closest(".task");
        if (!taskElement) return;

        const taskId = taskElement.dataset.id;

        if (e.target.tagName === "INPUT") {
            const newStatus = e.target.checked ? "done" : "pending";
            await fetch(`${API_URL}/tasks/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
        } else if (e.target.classList.contains("delete-btn")) {
            await fetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" });
            taskElement.remove();
        }
    });

    fetchTasks();
});
