const validateInput = (value = "") => {
  if (value === "") {
    return false
  }
  return true
}

const getFilteredTodos = (todos = [], todoId) => {
  const result = []
  todos.forEach((todoItem) => {
    if (todoItem?.children?.length > 0) {
      const subArr = getFilteredTodos(todoItem.children, todoId)
      todoItem.children = subArr
    }
    if (todoItem.id !== todoId) {
      result.push(todoItem)
    }
  })
  return result
}

const findTodo = (todos = [], todoId) => {
  let searchedTodo

  todos.forEach((todoItem) => {
    if (!searchedTodo && todoItem?.children?.length > 0) {
      searchedTodo = findTodo(todoItem.children, todoId)
    }
    if (todoItem.id === todoId) {
      searchedTodo = todoItem
    }
  })

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
