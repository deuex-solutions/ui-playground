import { Card as MuiCard, CardMedia, Box, Typography } from '@mui/material'

const Card = ({ card, flip, onClick }) => {
  return (
    <MuiCard
      key={card.id}
      className={`card ${flip ? 'flip' : ''} ${card?.isMatch ? 'd-none' : ''}`}
      onClick={() => onClick(card)}
    >
      <Box className="front-card">
        <Typography align="center" variant="h5">
          Flip
        </Typography>
      </Box>
      <Box className="back-card">
        <CardMedia component="img" alt="card" image={card.src} sx={{ height: '100%' }} />
      </Box>
    </MuiCard>
  )
}

export default Card
