let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();

  if (!value) return;

  tasks.push({ text: value, done: false });
  input.value = "";
  saveTasks();
  displayTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const complete = document.createElement("button");
    const remove = document.createElement("button");

    span.textContent = task.text;
    if (task.done) span.className = "done";

    complete.textContent = task.done ? "Undo" : "Done";
    complete.onclick = () => toggleTask(index);

    remove.textContent = "Delete";
    remove.onclick = () => deleteTask(index);

    li.append(span, complete, remove);
    list.appendChild(li);
  });

  const completed = tasks.filter(t => t.done).length;
  document.getElementById("count").textContent =
    `Completed: ${completed} / ${tasks.length}`;
}

displayTasks();
