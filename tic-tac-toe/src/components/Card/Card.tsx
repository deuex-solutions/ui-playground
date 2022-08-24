import React from 'react'
import './Card.css'

interface Props {
  value: string
  idx: number
  onClick: (i: number) => void
}

const Card: React.FC<Props> = ({ value, idx, onClick }) => {
  return (
    <button type="button" className="card" onClick={() => onClick(idx)}>
      {value}
    </button>
  )
}

export default Card
