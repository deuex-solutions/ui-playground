const createTodoButton = (props = {}) => {
  const { textContent = "", innerHTML = "" } = props

  const todoBtnEl = document.createElement("button")
  todoBtnEl.textContent = textContent

  if (innerHTML) {
    todoBtnEl.innerHTML = innerHTML
  }

  return todoBtnEl
}

export default createTodoButton
