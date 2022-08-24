import React, { useCallback, useEffect, useState } from 'react'
import Card from '../Card/Card'
import './Board.css'

interface Props {
  selectedChoice: string
  onStatusChange: (message: string) => void
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

const Board: React.FC<Props> = ({ selectedChoice, onStatusChange, onReset }) => {
  const [cards, setCards] = useState<string[]>(getEmptyCards)
  const [isX, setIsX] = useState<boolean>(false)
  const [moves, setMoves] = useState(0)

  const handleReset = useCallback(() => {
    setCards([...getEmptyCards()])
    setMoves(0)
    onReset()
  }, [onReset])

  useEffect(() => {
    if (selectedChoice === 'X') {
      setIsX(true)
    } else {
      setIsX(false)
    }
  }, [selectedChoice])

  useEffect(() => {
    const winner = checkWinner(cards)
    if (winner) {
      onStatusChange(`Winner is ${winner}`)
    } else if (moves === cards.length && !winner) {
      onStatusChange('Match Draw')
    } else {
      const playerTurn = isX ? 'X' : '0'
      onStatusChange(`Player ${playerTurn}'s turn`)
    }
  }, [cards, handleReset, isX, moves, onStatusChange])

  const handleOnClick = (idx: number) => {
    if (cards[idx] || checkWinner(cards)) return

    const duplicateCards: string[] = [...cards]
    duplicateCards[idx] = !isX ? '0' : 'X'

    setCards([...duplicateCards])
    setIsX(!isX)
    setMoves(moves + 1)
  }

  return (
    <div className="board-container">
      <button type="button" className="text-button" onClick={handleReset}>
        Restart
      </button>
      <div className="board-grid">
        {getEmptyCards().map((_, idx) => (
          <Card key={idx} value={cards[idx]} idx={idx} onClick={handleOnClick} />
        ))}
      </div>
    </div>
  )
}

export default Board
