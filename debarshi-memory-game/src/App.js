import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useCardContext } from 'contexts/CardContext'
import { Card, FormModal, GameOverModal, Timer } from 'components'
import { modals } from 'constants/modals'
import { useModalContext } from 'contexts/ModalContext'
import levels from 'constants/levels'

const App = () => {
  const [username, setUsername] = useState('')

  const { cardList, selectedCards, points, turns, reset, onCardSelected, onLevelChange } =
    useCardContext()
  const { state, dispatch } = useModalContext()

  useEffect(() => {
    if (turns === cardList.length) {
      dispatch({ type: modals.END_MODAL })
    }
  }, [cardList.length, turns, dispatch])

  const handleOnCardClick = (item) => onCardSelected(item)

  const handleStart = (value) => {
    setUsername(value)
  }

  const resetGame = () => {
    setUsername('')
    reset()
  }

  const handleOnLevelChange = (current) => onLevelChange(current)

  return (
    <div className="app">
      <Typography component="h3" variant="h3" align="center" sx={{ marginTop: '1rem' }}>
        Memory Game
      </Typography>

      {!state.modal && <Timer onExpire={() => dispatch({ type: modals.END_MODAL })} />}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
        <Button variant="outlined" onClick={() => handleOnLevelChange(levels.EASY)}>
          EASY
        </Button>
        <Button variant="outlined" onClick={() => handleOnLevelChange(levels.MEDIUM)}>
          MEDIUM
        </Button>
        <Button variant="outlined" onClick={() => handleOnLevelChange(levels.HARD)}>
          HARD
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="h6" variant="h6" align="left">
          Player: {username}
        </Typography>
        <Typography component="h6" variant="h6" align="left">
          Points: {points}
        </Typography>
      </Box>

      <FormModal onStart={handleStart} />
      <GameOverModal onReset={resetGame} />

      <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2} sx={{ marginBottom: '2rem' }}>
        {cardList.map((card) => (
          <Grid item xs={2} sm={4} md={3} key={card.id}>
            <Card
              card={card}
              initialFlip={!state.modal}
              flip={card.id === selectedCards?.first?.id || card.id === selectedCards?.second?.id}
              onClick={handleOnCardClick}
            />
          </Grid>
        ))}
      </Grid>
      <Toaster />
    </div>
  )
}

export default App
