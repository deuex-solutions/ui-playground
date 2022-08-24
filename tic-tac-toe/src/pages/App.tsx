import React, { useState } from 'react'
import { Board, Modal } from 'components'

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [username, setUsername] = useState('')
  const [choice, setChoice] = useState('')

  const handleModalClose = (open = false) => {
    setIsModalOpen(open)
  }

  const handleOnStart = (name: string) => {
    setUsername(name)
  }

  const handleChoice = (selectedChoice: string) => {
    setChoice(selectedChoice)
  }

  return (
    <div className="container">
      <h4>Tic Tac Toe</h4>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onStart={handleOnStart}
        onChoiceChange={handleChoice}
        selectedChoice={choice}
      />
      <Board player={choice} />
    </div>
  )
}
export default App
