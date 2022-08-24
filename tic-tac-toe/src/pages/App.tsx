import React, { useCallback, useState } from 'react'
import { Board, Modal } from 'components'

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true)
  const [username, setUsername] = useState<string>('')
  const [choice, setChoice] = useState<string>('')

  const handleModalClose = (open = false) => setIsModalOpen(open)

  const handleOnStart = (name: string) => setUsername(name)

  const handleChoice = (selectedChoice: string) => setChoice(selectedChoice)

  const resetGame = useCallback(() => {
    setIsModalOpen(true)
    setUsername('')
    setChoice('')
  }, [])

  return (
    <div className="container">
      <header className="header-wrapper">
        <h2 className="text-primary text-center">Tic Tac Toe</h2>
        <div className="flex align-center justify-between">
          <h4>Player: {username}</h4>
          <h4>Choice: {choice}</h4>
        </div>
      </header>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onStart={handleOnStart}
        onChoiceChange={handleChoice}
        selectedChoice={choice}
      />
      <section className="grid-wrapper">
        <Board selectedChoice={choice} onReset={resetGame} />
      </section>
    </div>
  )
}
export default App
