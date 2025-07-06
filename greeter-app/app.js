"use strict";
let fromEle = document.querySelector("form");
let inputEl = document.querySelector("input");
let buttonEle = document.querySelector("button");
let todoEle = document.querySelector(".todo");
let Todos = [];
restoreFromLocal();
function addTask() {
    todoEle.innerHTML = "";
    // Optional: Sort incomplete first
    Todos.sort((a, b) => Number(a.status) - Number(b.status));
    Todos.forEach((item) => {
        let li = document.createElement("li");
        let idTag = document.createElement("p");
        idTag.innerText = `ID: ${item.id}`;
        let textTag = document.createElement("p");
        textTag.innerText = `Todo: ${item.text}`;
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteTodo(item.id);
        });
        let editTask = document.createElement("button");
        editTask.innerText = "Edit";
        editTask.addEventListener("click", () => {
            li.innerHTML = "";
            let editInput = document.createElement("input");
            editInput.value = item.text;
            let saveBtn = document.createElement("button");
            saveBtn.innerText = "Save";
            saveBtn.addEventListener("click", () => {
                const newValue = editInput.value.trim();
                if (newValue !== "") {
                    item.text = newValue;
                    saveToLocal();
                    addTask();
                }
            });
            let cancelBtn = document.createElement("button");
            cancelBtn.innerText = "Cancel";
            cancelBtn.addEventListener("click", () => {
                addTask();
            });
            li.append(idTag, editInput, saveBtn, cancelBtn);
        });
        let statusBtn = document.createElement("button");
        updateStatusButton(statusBtn, item.status);
        statusBtn.addEventListener("click", () => {
            item.status = !item.status;
            saveToLocal();
            addTask();
        });
        li.append(idTag, textTag, deleteBtn, editTask, statusBtn);
        todoEle.appendChild(li);
    });
}
function updateStatusButton(button, status) {
    button.innerText = `Status: ${status ? "Complete" : "Not Complete"}`;
    button.style.backgroundColor = status ? "lightgreen" : "lightcoral";
    button.style.border = "none";
    button.style.padding = "4px 8px";
    button.style.marginLeft = "10px";
    button.style.cursor = "pointer";
}
fromEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const todoText = inputEl.value.trim();
    if (todoText === "")
        return;
    const todo = {
        id: Date.now(),
        text: todoText,
        status: false
    };
    Todos.push(todo);
    saveToLocal();
    inputEl.value = "";
    addTask();
});
function deleteTodo(id) {
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
    }
    addTask();
}
