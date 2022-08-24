import React, { useState } from 'react'
import { Card } from 'components'
import './Board.css'

interface Props {
  player: string
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

const Board: React.FC<Props> = ({ player }) => {
  const [cards, setCards] = useState<string[]>(new Array(9).fill(''))
  const [isX, setIsX] = useState(true)

  const handleOnClick = (idx: number) => {
    if (cards[idx] || checkWinner(cards)) return

    const duplicateCards: string[] = [...cards]
    duplicateCards[idx] = isX ? 'X' : '0'

    setCards([...duplicateCards])
    setIsX(!isX)
  }

  if (checkWinner(cards)) {
    return null
  }

  return (
    <div className="board-grid">
      {new Array(9).fill('').map((_, idx) => (
        <Card value={cards[idx]} idx={idx} onClick={handleOnClick} />
      ))}
    </div>
  )
}

export default Board
