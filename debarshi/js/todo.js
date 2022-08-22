import todos from "./constant.js"
import { cardContainer, mainEl, noTodoText, todoWrapper } from "./selectors.js"
import {
  createTodoBase,
  createTodoRoot,
  createTodoButton,
  createTodoCheckbox,
  createTodoInput,
} from "./components/index.js"

import {
  findNode,
  findTodo,
  getFilteredTodos,
  markTodosComplete,
  validateInput,
} from "./utils/helperfuncs.js"

// Creates todo nodes and attaches listeners to parent node
const createTodoNodes = (todo, draggable, includeChildTodos) => {
  const todoBaseEl = createTodoBase(todo, {
    draggable,
    classList: ["todo-border"],
  })

  const divRoot = createTodoRoot(includeChildTodos)

  const todoCheckEl = createTodoCheckbox(todo?.isCompleted)

  const todoTextEl = document.createElement("p")
  todoTextEl.textContent = todo.text
  if (todo.isCompleted) {
    todoTextEl.classList.add("text-through")
  }

  const deleteTodoBtn = createTodoButton({
    innerHTML: "<i class='fas fa-trash'></i>",
  })
  deleteTodoBtn.setAttribute("id", "delete-todo")

  const editTodoBtn = createTodoButton({
    innerHTML: "<i class='fas fa-edit'></i>",
  })
  editTodoBtn.setAttribute("id", "edit-todo")

  const addSubTodoBtn = createTodoButton({ textContent: "Add Sub Todo" })
  addSubTodoBtn.setAttribute("id", "sub-todo")
  addSubTodoBtn.classList.add("invisible")

  const todoFragment = new DocumentFragment()

  todoFragment.append(
    todoCheckEl,
    todoTextEl,
    addSubTodoBtn,
    editTodoBtn,
    deleteTodoBtn,
  )

  divRoot.appendChild(todoFragment)
  todoBaseEl.appendChild(divRoot)

  return todoBaseEl
}

// Toggles a todos' checked and un-checked state
const toggleTodoCompleted = (event) => {
  const { nextSibling = null } = event.target
  const todoId = event.target
    ?.closest("li.todo-border")
    ?.getAttribute("data-id")

  if (todoId) {
    const currentTodo = findTodo(todos, Number(todoId))
    currentTodo.isCompleted = !currentTodo.isCompleted

    if (nextSibling && nextSibling.tagName === "P") {
      nextSibling.classList.toggle("text-through")
    }
  }
}

// Deletes a todo from the DOM
const deleteTodo = (event) => {
  const { target } = event
  const todoId = target?.closest("li.todo-border")?.getAttribute("data-id")

  if (todoId) {
    const filteredTodos = getFilteredTodos(todos, Number(todoId))
    todos.length = 0
    todos.push(...filteredTodos)
    todoWrapper.innerHTML = ""
    render()
  }

  if (!todoWrapper.childNodes.length) {
    cardContainer.classList.add("d-none")
    noTodoText.classList.remove("d-none")
  }
}

// Creates input todo nodes to edit the current todo
const renderEditTodoNodes = (event) => {
  const { parentNode = null } = event.target

  const textNode = findNode(event.target?.parentNode, "P")

  if (textNode) {
    const containerNode = document.createElement("div")
    containerNode.classList.add("flex")

    const editTodoInputEl = createTodoInput({
      type: "text",
      value: textNode.textContent,
    })

    const editTodoBtn = createTodoButton({
      innerHTML: "<i class='fas fa-plus'></i>",
    })
    editTodoBtn.setAttribute("id", "update-todo")
    editTodoBtn.style.marginLeft = "10px"

    const cancelEditBtn = createTodoButton({
      innerHTML: "<i class='fas fa-times'></i>",
    })
    cancelEditBtn.setAttribute("id", "cancel-edit-todo")

    const fragment = new DocumentFragment()
    fragment.append(editTodoInputEl, editTodoBtn, cancelEditBtn)
    containerNode.appendChild(fragment)

    parentNode.replaceWith(containerNode)
  }
}

// Create child todo input items
const renderCreateSubTodoNodes = (event) => {
  const rootTodoNode = event.target?.closest("li.todo-border")

  const containerChildNode = document.createElement("div")
  containerChildNode.classList.add("todo", "sub-todo-input")

  const childTodoInputEl = createTodoInput()
  childTodoInputEl.placeholder = "Sub Task"

  const addChildTodoBtn = createTodoButton({
    innerHTML: "<i class='fas fa-plus'></i>",
  })
  addChildTodoBtn.disabled = true
  addChildTodoBtn.style.marginLeft = "10px"
  addChildTodoBtn.setAttribute("id", "add-sub-todo")

  const cancelChildTodoBtn = createTodoButton({
    innerHTML: "<i class='fas fa-times'></i>",
  })
  cancelChildTodoBtn.setAttribute("id", "cancel-sub-todo")

  const fragment = new DocumentFragment()
  fragment.append(childTodoInputEl, addChildTodoBtn, cancelChildTodoBtn)

  containerChildNode.appendChild(fragment)

  rootTodoNode.appendChild(containerChildNode)
}

// Updates the current todo and attaches into the DOM
const handleEditTodo = (event) => {
  const { previousSibling = null } = event.target
  const rootTodoNode = event.target?.closest("li.todo-border")

  const todoId = Number(rootTodoNode.getAttribute("data-id"))

  if (validateInput(previousSibling.value) && todoId) {
    const currentTodo = findTodo(todos, Number(todoId))

    if (currentTodo) {
      currentTodo.text = previousSibling.value
    }
    todoWrapper.innerHTML = ""
    render()
  }
}

// Adds todos nodes into the DOM
const handleAddTodo = (event) => {
  const { target } = event

  const inputEl = findNode(target.parentNode, "INPUT")
  const rootTodoNode = target?.closest("li.todo-border")
  const todoId = rootTodoNode?.getAttribute("data-id")

  if (todoId && validateInput(inputEl?.value)) {
    const currentTodo = findTodo(todos, Number(todoId))

    if (currentTodo) {
      const newTodo = {
        id: new Date().getSeconds(),
        text: inputEl.value,
        isCompleted: false,
      }
      currentTodo.children.push(newTodo)
    }
  } else {
    const todo = {
      id: new Date().getSeconds(),
      text: inputEl.value,
      isCompleted: false,
      children: [],
    }

    todos.push(todo)

    cardContainer.classList.remove("d-none")
    cardContainer.classList.add("padding-xs")
    noTodoText.classList.add("d-none")
    inputEl.value = ""
    target.disabled = true

    todoWrapper.innerHTML = ""
  }
  render()
}

// Clear all todos
const clearAllTodos = () => {
  todos.length = 0
  todoWrapper.innerHTML = ""

  cardContainer.classList.remove("padding-xs")
  noTodoText.classList.remove("d-none")
  cardContainer.classList.add("d-none")
}

const removeTodoNodes = () => {
  todoWrapper.innerHTML = ""
  render()
}

// Renders todos into the DOM
const render = (
  parentNode = todoWrapper,
  items = todos,
  draggable = true,
  includeChildTodos = true,
) => {
  const docFragment = new DocumentFragment()

  items.forEach((todo) => {
    const todoNode = createTodoNodes(todo, draggable, includeChildTodos)

    if (todo?.children?.length) {
      parentNode.innerHTML = ""
      render(todoNode, todo.children, false, false)
    }
    docFragment.appendChild(todoNode)
  })
  parentNode.appendChild(docFragment)
}

// Handle add todo button disabled status on input change
const handleInputChange = (event) => {
  const { value = "", parentNode } = event.target
  const btnEl = findNode(parentNode, "BUTTON")

  if (btnEl && validateInput(value)) {
    btnEl.disabled = false
  } else {
    btnEl.disabled = true
  }
}

// Marks all todos as complete
const handleMarkAllComplete = () => {
  const completedTodos = markTodosComplete(todos)
  todos.length = 0
  todos.push(...completedTodos)
  todoWrapper.innerHTML = ""
  render()
}

// Delegated event handler for click events
const handleTodoClick = (event) => {
  const { tagName, id, type } = event.target

  if (tagName === "INPUT" && type === "checkbox") {
    return toggleTodoCompleted(event)
  } else {
    if (tagName === "BUTTON") {
      switch (id) {
        case "add-sub-todo":
          return handleAddTodo(event)
        case "add-todo":
          return handleAddTodo(event)
        case "delete-todo":
          return deleteTodo(event)
        case "edit-todo":
          return renderEditTodoNodes(event)
        case "update-todo":
          return handleEditTodo(event)
        case "sub-todo":
          return renderCreateSubTodoNodes(event)
        case "cancel-sub-todo":
          return removeTodoNodes(event)
        case "cancel-edit-todo":
          return removeTodoNodes(event)
        case "clear":
          return clearAllTodos()
        case "mark-complete":
          return handleMarkAllComplete()
      }
    }
  }
}

// event listeners attached
mainEl.addEventListener("keyup", handleInputChange)
mainEl.addEventListener("click", handleTodoClick)

export default render
