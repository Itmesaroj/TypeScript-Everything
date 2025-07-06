let fromEle = document.querySelector("form") as HTMLFormElement;
let inputEl = document.querySelector("input") as HTMLInputElement;
let buttonEle = document.querySelector("button") as HTMLButtonElement;
let todoEle = document.querySelector(".todo") as HTMLUListElement;

interface Todo {
    id: number;
    text: string;
}

let Todos: Todo[] = [];

restoreFromLocal();

function addTask() {
  todoEle.innerHTML = "";

  Todos.forEach((item) => {
    let li = document.createElement("li");

    let idTag = document.createElement("p");
    idTag.innerText = `id -- ${item.id}`;

    let textTag = document.createElement("p");
    textTag.innerText = `Todo -- ${item.text}`;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete Todo";
    deleteBtn.addEventListener("click", () => {
      deleteTodo(item.id);
    });

    let editTask = document.createElement("button");
    editTask.innerText = "Edit Task";
    editTask.addEventListener("click", () => {
      li.innerHTML = ""; // Clear current content

      let editInput = document.createElement("input");
      editInput.value = item.text;

      let saveBtn = document.createElement("button");
      saveBtn.innerText = "Save Task";

      saveBtn.addEventListener("click", () => {
        const newValue = editInput.value.trim();
        if (newValue !== "") {
          // Update value in the Todos array
          item.text = newValue;
          saveToLocal();  // Save to localStorage
          addTask();      // Re-render UI
        }
      });

      let cancelBtn = document.createElement("button");
      cancelBtn.innerText = "Cancel";
      cancelBtn.addEventListener("click", () => {
        addTask(); // Just re-render to cancel editing
      });

      li.append(idTag, editInput, saveBtn, cancelBtn);
    });

    li.append(idTag, textTag, deleteBtn, editTask);
    todoEle.appendChild(li);
  });
}

fromEle.addEventListener("submit", (e) => {
    e.preventDefault();

    const todoText = inputEl.value.trim();
    if (todoText === "") return;

    let todo: Todo = {
        id: Date.now(),
        text: todoText
    };

    Todos.push(todo);
    saveToLocal();
    inputEl.value = "";
    addTask();
});

function deleteTodo(id: number) {
    Todos = Todos.filter((item) => item.id !== id);
    saveToLocal();
    addTask();
}

function saveToLocal() {
    localStorage.setItem("todos", JSON.stringify(Todos));
}

function restoreFromLocal() {
    const data = localStorage.getItem("todos");
    if (data) {
        Todos = JSON.parse(data);
        addTask(); // <-- Make sure this is called with parentheses
    }
}


