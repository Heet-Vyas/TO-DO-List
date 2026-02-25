document.addEventListener("DOMContentLoaded", function () {

    let addBtn = document.getElementById("addBtn");
    let taskInput = document.getElementById("todoInput");
    let taskList = document.getElementById("tasklist");

    let tasks = [];

    function renderList() {

        taskList.innerHTML = "";

        tasks.forEach((task, index) => {

            let li = document.createElement("li");
            li.textContent = task.task;

            if (task.isCompleted) {
                li.classList.add("toggleStatus");
            }

            taskList.appendChild(li);

            
            // Toggle
        li.addEventListener("click", function () {
        task.isCompleted = !task.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderList(); 
        });

            // Delete
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            li.appendChild(deleteBtn);

            deleteBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                renderList();
            });

            // Edit
            let editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            li.appendChild(editBtn);

            editBtn.addEventListener("click", function (e) {
                e.stopPropagation();

                let input = document.createElement("input");
                input.type = "text";
                input.value = task.task;

                li.firstChild.replaceWith(input);
                input.focus();

                input.addEventListener("blur", function () {
                    let newText = input.value.trim();
                    if (newText === "") return;

                    task.task = newText;
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    renderList();
                });
            });

        });
    }

    // Load
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderList();
    }

    // Add
    addBtn.addEventListener("click", function () {

        let taskText = taskInput.value.trim();
        if (taskText === "") return;

        tasks.push({
            task: taskText,
            isCompleted: false
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderList();
        taskInput.value = "";
    });

});