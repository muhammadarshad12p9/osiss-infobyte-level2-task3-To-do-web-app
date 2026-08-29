const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const pendingList = document.getElementById("pendingList");

const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");

const completedCount = document.getElementById("completedCount");



let tasks = JSON.parse(localStorage.getItem("tasks")) || [];




function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}




function formatDate(date) {

    return new Date(date).toLocaleString();

}



function addTask() {

    const taskText = taskInput.value.trim();


    if (taskText === "") {

        alert("Please enter a task!");

        return;

    }


    const newTask = {

        id: Date.now(),

        text: taskText,

        completed: false,

        createdAt: new Date().toISOString(),

        completedAt: null

    };


    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    renderTasks();

}




function renderTasks() {

    pendingList.innerHTML = "";

    completedList.innerHTML = "";


    const pendingTasks = tasks.filter(function (task) {

        return task.completed === false;

    });


    const completedTasks = tasks.filter(function (task) {

        return task.completed === true;

    });


    pendingCount.textContent =
        pendingTasks.length + " pending";


    completedCount.textContent =
        completedTasks.length + " completed";


    

    if (pendingTasks.length === 0) {

        pendingList.innerHTML = `
            <div class="empty-message">
                🎉 No pending tasks. Enjoy your day!
            </div>
        `;

    }




    if (completedTasks.length === 0) {

        completedList.innerHTML = `
            <div class="empty-message">
                No completed tasks yet.
            </div>
        `;

    }


    

    pendingTasks.forEach(function (task) {

        createTaskElement(
            task,
            pendingList
        );

    });


    

    completedTasks.forEach(function (task) {

        createTaskElement(
            task,
            completedList
        );

    });

}




function createTaskElement(task, list) {

    const taskDiv = document.createElement("div");

    taskDiv.classList.add("task");


    if (task.completed) {

        taskDiv.classList.add("completed");

    }


    const taskText = document.createElement("div");

    taskText.classList.add("task-text");

    taskText.textContent = task.text;


    const timestamp = document.createElement("div");

    timestamp.classList.add("timestamp");


    if (task.completed) {

        timestamp.textContent =
            "Completed: " +
            formatDate(task.completedAt);

    } else {

        timestamp.textContent =
            "Added: " +
            formatDate(task.createdAt);

    }


    const actions = document.createElement("div");

    actions.classList.add("task-actions");


    

    const completeBtn = document.createElement("button");

    completeBtn.classList.add("complete-btn");


    if (task.completed) {

        completeBtn.textContent = "Undo";

    } else {

        completeBtn.textContent = "Mark Complete";

    }


    completeBtn.addEventListener("click", function () {

        toggleTask(task.id);

    });



    const editBtn = document.createElement("button");

    editBtn.classList.add("edit-btn");

    editBtn.textContent = "Edit";


    editBtn.addEventListener("click", function () {

        editTask(task.id);

    });


    const deleteBtn = document.createElement("button");

    deleteBtn.classList.add("delete-btn");

    deleteBtn.textContent = "Delete";


    deleteBtn.addEventListener("click", function () {

        deleteTask(task.id);

    });


    actions.appendChild(completeBtn);

    actions.appendChild(editBtn);

    actions.appendChild(deleteBtn);


    taskDiv.appendChild(taskText);

    taskDiv.appendChild(timestamp);

    taskDiv.appendChild(actions);


    list.appendChild(taskDiv);

}




function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {

            task.completed = !task.completed;


            if (task.completed) {

                task.completedAt =
                    new Date().toISOString();

            } else {

                task.completedAt = null;

            }

        }

        return task;

    });


    saveTasks();

    renderTasks();

}

function editTask(id) {

    const task = tasks.find(function (task) {

        return task.id === id;

    });


    const updatedText = prompt(
        "Edit your task:",
        task.text
    );


    if (
        updatedText !== null &&
        updatedText.trim() !== ""
    ) {

        task.text =
            updatedText.trim();


        saveTasks();

        renderTasks();

    }

}



function deleteTask(id) {

    tasks = tasks.filter(function (task) {

        return task.id !== id;

    });


    saveTasks();

    renderTasks();

}




addTaskBtn.addEventListener(
    "click",
    addTask
);


taskInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


renderTasks();