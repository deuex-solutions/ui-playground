const validateInput = (value = "") => {
  if (value === "") {
    return false
  }
  return true
}

const getFilteredTodos = (todos = [], todoId) => {
  const result = []
  for (let todo of todos) {
    if (todo?.children?.length > 0) {
      const subArr = getFilteredTodos(todo.children, todoId)
      todo.children = subArr
    }
    if (todo.id !== todoId) {
      result.push(todo)
    }
  }

  return result
}

const findTodo = (todos = [], todoId) => {
  let searchedTodo

  for (let todo of todos) {
    if (!searchedTodo && todo?.children?.length > 0) {
      searchedTodo = findTodo(todo.children, todoId)
    }
    if (todo.id === todoId) {
      searchedTodo = todo
    }
  }

  return searchedTodo
}

const markTodosComplete = (todos = []) => {
  return todos.map((todoItem) => {
    if (todoItem?.children?.length > 0) {
      const subTodos = markTodosComplete(todoItem.children)
      todoItem.children = [...subTodos]
    }
    return { ...todoItem, isCompleted: true }
  })
}

const findNode = (parentNode = {}, tagName = "") => {
  let resultNode

  parentNode?.childNodes?.forEach((nodeItem) => {
    if (!resultNode && nodeItem.tagName === tagName) {
      resultNode = nodeItem
    }
  })
  return resultNode
}

export {
  validateInput,
  getFilteredTodos,
  findTodo,
  markTodosComplete,
  findNode,
}
