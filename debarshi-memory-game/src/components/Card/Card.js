import cn from 'clsx'
import { useEffect, useState } from 'react'
import { Card as MuiCard, CardMedia, Box, Typography } from '@mui/material'

const Card = ({ card, flip, onClick, initialFlip }) => {
  const [showCards, setShowCards] = useState(false)

  useEffect(() => {
    if (initialFlip) {
      setShowCards(true)
    }
  }, [initialFlip])

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (showCards) {
        setShowCards(false)
      }
    }, 1500)

    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [showCards])

  return (
    <MuiCard
      key={card.id}
      className={cn('card', { flip: flip || showCards, 'd-none': card.isMatch })}
      onClick={() => onClick(card)}
    >
      <Box className="front-card">
        <CardMedia component="img" alt="card" image={card.src} sx={{ height: '100%' }} />
      </Box>
      <Box className="back-card">
        <Typography align="center" variant="h5">
          Flip
        </Typography>
      </Box>
    </MuiCard>
  )
}

export default Card
