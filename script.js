// ==========================
// Select DOM Elements
// ==========================
const addButton = document.querySelector(".add-task-btn");
const modal = document.querySelector(".modal");
const saveButton = document.querySelector("#saveTask");
const cancelButton = document.querySelector("#cancelTask");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector(".task-list");
const searchInput = document.querySelector(".search-input");
const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
const remainingTasks = document.querySelector("#remainingTasks");
const emptyMessage = document.querySelector(".empty-message");

// ==========================
// Modal Controllers
// ==========================
function openModal() {
    modal.style.display = "flex";
    taskInput.focus();
}

function closeModal() {
    modal.style.display = "none";
    taskInput.value = "";
}

addButton.addEventListener("click", openModal);
cancelButton.addEventListener("click", closeModal);

// Close modal when clicking outside the box
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

// ==========================
// Add Task Logic
// ==========================
function handleAddTask() {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task name.");
        return;
    }

    createTask(taskName);
    closeModal();
}

saveButton.addEventListener("click", handleAddTask);

// Support Enter key inside input
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleAddTask();
    }
});

// ==========================
// Create Task Card
// ==========================
function createTask(taskName) {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";

    taskCard.innerHTML = `
        <div class="task-top">
            <div class="task-info">
                <input type="checkbox" class="task-checkbox">
                <span class="task-title">${taskName}</span>
            </div>
            <button class="task-menu-btn" title="Delete Task">🗑</button>
        </div>
    `;

    addTaskEvents(taskCard);
    taskList.appendChild(taskCard);
    updateStatistics();
}

// ==========================
// Task Event Listeners
// ==========================
function addTaskEvents(taskCard) {
    const deleteButton = taskCard.querySelector(".task-menu-btn");
    const checkbox = taskCard.querySelector(".task-checkbox");

    deleteButton.addEventListener("click", function () {
        taskCard.remove();
        updateStatistics();
    });

    checkbox.addEventListener("change", function () {
        taskCard.classList.toggle("completed");
        updateStatistics();
    });
}

// ==========================
// Statistics & UI Updates
// ==========================
function updateStatistics() {
    const allTasks = document.querySelectorAll(".task-card");
    const completed = document.querySelectorAll(".task-card.completed");

    totalTasks.textContent = allTasks.length;
    completedTasks.textContent = completed.length;
    remainingTasks.textContent = allTasks.length - completed.length;

    if (allTasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// ==========================
// Search Filtering
// ==========================
searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase().trim();
    const allTasks = document.querySelectorAll(".task-card");

    allTasks.forEach(function (task) {
        const taskTitle = task.querySelector(".task-title").textContent.toLowerCase();

        if (taskTitle.includes(searchText)) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
});