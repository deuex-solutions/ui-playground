import React, { useRef } from 'react'
import ReactModal from 'react-modal'
import './Modal.css'

interface Props {
  isOpen: boolean
  selectedChoice: string
  onClose: (type: boolean) => void
  onStart: (value: string) => void
  onChoiceChange: (choice: string) => void
}

const Modal: React.FC<Props> = ({ isOpen, selectedChoice, onClose, onStart, onChoiceChange }) => {
  const nameRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    if (nameRef?.current?.value && nameRef.current.value !== '' && selectedChoice) {
      onStart(nameRef.current.value)
      onClose(false)
      nameRef.current.value = ''
    }
  }

  const handleChoiceChange = (userChoice: string) => {
    onChoiceChange(userChoice)
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      shouldCloseOnOverlayClick={false}
      style={{
        content: {
          border: 'none',
          background: '#F5F5F5',
          maxWidth: '22rem',
          width: '100%',
          height: '45%',
          margin: '0 auto',
          zIndex: 999,
          inset: 0,
          position: 'relative',
        },
        overlay: {
          background: 'rgb(0, 0, 0, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <h2 className="text-center">Tic-Tac-Toe</h2>
      <section>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="input"
            ref={nameRef}
          />
        </div>
        <div className="flex align-center">
          <h3 className="font-500">Select Player Choice</h3>
          <label htmlFor="choice-one" className="modal-label">
            <input
              type="radio"
              name="choice-one"
              id="choice-one"
              checked={selectedChoice === 'X'}
              onChange={() => handleChoiceChange('X')}
            />
            X
          </label>

          <label htmlFor="choice-two" className="modal-label">
            <input
              type="radio"
              name="choice-two"
              id="choice-two"
              checked={selectedChoice === '0'}
              onChange={() => handleChoiceChange('0')}
            />
            0
          </label>
        </div>
      </section>
      <button type="button" className="modal-button" onClick={handleClick}>
        Start
      </button>
    </ReactModal>
  )
}

export default Modal
