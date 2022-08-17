import { modals } from 'constants/modals'
import { createContext, useContext, useMemo, useReducer } from 'react'

const ModalContext = createContext()

const initialState = {
  modal: 'START_MODAL',
}

const reducer = (state, action) => {
  const { START_MODAL, END_MODAL } = modals
  switch (action.type) {
    case END_MODAL:
      return { ...state, modal: 'END_MODAL' }
    case START_MODAL:
      return { ...state, modal: 'START_MODAL' }
    default:
      return { ...state, modal: null }
  }
}

export const useModalContext = () => useContext(ModalContext)

const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export default ModalProvider
