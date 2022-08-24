import React, { useCallback, useEffect, useState } from 'react'
import Card from '../Card/Card'
import './Board.css'

interface Props {
  selectedChoice: string
  onReset: () => void
}

const checkWinner = (cards: string[]) => {
  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < winningPattern.length; i++) {
    const [a, b, c] = winningPattern[i]
    if (cards[a] && cards[a] === cards[b] && cards[a] === cards[c]) {
      return cards[a]
    }
  }
  return null
}

const getEmptyCards = () => new Array<string>(9).fill('')

const Board: React.FC<Props> = ({ selectedChoice, onReset }) => {
  const [cards, setCards] = useState<string[]>(getEmptyCards)
  const [currentPlayer, setCurrentPlayer] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    setCurrentPlayer(selectedChoice)
  }, [selectedChoice])

  useEffect(() => {
    const winner = checkWinner(cards)
    if (winner) {
      setStatus(`Winner is ${winner}`)
    } else if (!winner && moves === cards.length) {
      setStatus('Match Draw')
    } else if (currentPlayer) {
      setStatus(`Player ${currentPlayer}'s turn`)
    }
  }, [cards, moves, currentPlayer])

  const handleOnClick = (idx: number) => {
    if (cards[idx] || checkWinner(cards)) return

    const duplicateCards: string[] = [...cards]
    duplicateCards[idx] = currentPlayer
    setCards([...duplicateCards])
    setMoves(moves + 1)
    setCurrentPlayer(currentPlayer === 'X' ? '0' : 'X')
  }

  const handleReset = useCallback(() => {
    setCards([...getEmptyCards()])
    setMoves(0)
    onReset()
  }, [onReset])

  return (
    <div className="board-container">
      <div className="flex align-center">
        <button type="button" className="text-button" onClick={handleReset}>
          Restart
        </button>
        <h3 className="text-center">{status}</h3>
      </div>
      <div className="board-grid">
        {getEmptyCards().map((_, idx) => (
          <Card key={idx} value={cards[idx]} idx={idx} onClick={handleOnClick} />
        ))}
      </div>
    </div>
  )
}

export default Board
