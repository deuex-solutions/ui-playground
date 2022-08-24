import React from 'react'
import './Card.css'

interface Props {
  value: string
  idx: number
  onClick: (i: number) => void
}

const Card: React.FC<Props> = ({ value, idx, onClick }) => {
  return (
    <div role="button" aria-hidden className="card" onClick={() => onClick(idx)}>
      {value}
    </div>
  )
}

export default Card
