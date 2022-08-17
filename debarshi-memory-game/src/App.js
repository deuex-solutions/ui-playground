import { useCallback, useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useCardContext } from 'contexts/CardContext'
import { Card, Modal, Timer } from 'components'
import { modals } from 'constants/modals'
import { useModalContext } from 'contexts/ModalContext'
import levels from 'constants/levels'

const boxStyles = {
  backgroundColor: '#fff',
  width: '20rem',
  height: '12rem',
  padding: '1rem',
  margin: '0 auto',
  borderRadius: '4px',
}

const App = () => {
  const [gameOver, setGameOver] = useState(false)
  const [username, setUsername] = useState('')
  const inputRef = useRef()

  const { cardList, selected, points, turns, reset, onSelected, onLevelChange } = useCardContext()
  const { state, dispatch } = useModalContext()

  const handleGameOver = useCallback(() => {
    setGameOver(true)
    dispatch({ type: modals.END_MODAL })
  }, [dispatch])

  useEffect(() => {
    if (turns === cardList.length) {
      handleGameOver()
    }
  }, [cardList.length, turns, dispatch, handleGameOver])

  const handleOnCardClick = (item) => onSelected(item)

  const handleModal = (modalType) => dispatch({ type: modalType })

  const handleStart = () => {
    if (inputRef.current.value !== '') {
      setUsername(inputRef.current.value)
      handleModal(null)
      inputRef.current.value = ''
    }
  }

  const resetGame = () => {
    setUsername('')
    handleModal(modals.START_MODAL)
    setGameOver(false)
    reset()
  }

  const handleOnLevelChange = (current) => onLevelChange(current)

  const renderFormModal = () => (
    <Modal open={state.modal === modals.START_MODAL} onClose={handleModal}>
      <Box sx={boxStyles}>
        <Typography component="p" variant="p" align="center" sx={{ marginBottom: '1rem' }}>
          Enter your name to start the game
        </Typography>
        <TextField label="Enter your name" variant="outlined" fullWidth inputRef={inputRef} />
        <Button variant="outlined" fullWidth sx={{ marginTop: '1rem' }} onClick={handleStart}>
          Start
        </Button>
      </Box>
    </Modal>
  )

  const renderGameOverModal = () => (
    <Modal open={state.modal === modals.END_MODAL} onClose={() => handleModal(modals.END_MODAL)}>
      <Box sx={boxStyles}>
        <Typography component="h4" variant="h4" align="center" sx={{ marginBottom: '1rem' }}>
          GAME OVER
        </Typography>
        <Typography component="p" variant="p" align="center" sx={{ marginBottom: '1rem' }}>
          Total points : {points}
        </Typography>
        <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} onClick={resetGame}>
          Reset
        </Button>
      </Box>
    </Modal>
  )

  return (
    <div className="app">
      <Typography component="h3" variant="h3" align="center" sx={{ marginTop: '1rem' }}>
        Memory Game
      </Typography>

      {!state.modal && <Timer onExpire={handleGameOver} />}

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

      {renderFormModal()}
      {gameOver && renderGameOverModal()}

      <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2} sx={{ marginBottom: '2rem' }}>
        {cardList.map((card) => (
          <Grid item xs={2} sm={4} md={3} key={card.id}>
            <Card
              card={card}
              initialFlip={!state.modal}
              flip={card.id === selected?.first?.id || card.id === selected?.second?.id}
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
