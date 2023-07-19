const inputBtn = document.querySelector(".input-form__btn");
const inputForm = document.querySelector(".input-form__input");
const todoList = document.querySelector(".todos");

let value = "";

const todoInfo = (e) => {
  value = inputForm.value;
  if (value.trim() !== "") {
    todoList.append(createToDo(value));
    const todoListItems = getToDoList();
    todoListItems.push(value);
    localStorage.setItem("todolist", JSON.stringify(todoListItems));
  }

  inputForm.value = "";
};

const createToDo = (todo) => {
  const div = document.createElement("div");
  div.className = "todo";
  div.innerHTML = `
  <p class="todo__text">${todo}</p>
  <button class="todo__btn">
    <img src="./imgs/delete.svg" alt="delete" />
  </button>
`;
  div.querySelector(".todo__btn").addEventListener("click", deleteToDo);
  return div;
};
const deleteToDo = (e) => {
  const todoElement = e.target.closest(".todo");
  const todoValue = todoElement.querySelector(".todo__text").textContent;
  const todoListItems = getToDoList();

  const updateToDo = todoListItems.filter((item) => item !== todoValue);
  localStorage.setItem("todolist", JSON.stringify(updateToDo));
  todoElement.remove();
};

function getToDoList() {
  const storedList = localStorage.getItem("todolist");
  return storedList ? JSON.parse(storedList) : [];
}
const storedList = getToDoList();
storedList.forEach((item) => {
  todoList.append(createToDo(item));
});

inputBtn.addEventListener("click", todoInfo);
document.addEventListener("keyup", (event) => {
  if (event.code === "Enter") todoInfo();
});
