import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useCardContext } from 'contexts/CardContext'
import { Card, Modal } from 'components'

const App = () => {
  const [modalOpen, setModalOpen] = useState(true)
  const [username, setUsername] = useState('')

  const { cardList, selected, onSelected } = useCardContext()

  const handleOnCardClick = (item) => {
    onSelected(item)
  }

  const handleCloseModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleChange = (e) => {
    setUsername(e.target.value)
  }

  return (
    <div className="app">
      <Typography component="h3" variant="h3" align="center" sx={{ margin: '1rem 0' }}>
        Memory Game
      </Typography>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            backgroundColor: '#fff',
            width: '20rem',
            height: '12rem',
            padding: '1rem',
            margin: '0 auto',
            borderRadius: '4px',
          }}
        >
          <Typography component="p" variant="p" align="center" sx={{ marginBottom: '1rem' }}>
            Enter your name to start the game
          </Typography>
          <TextField
            label="Enter your name"
            variant="outlined"
            fullWidth
            value={username}
            onChange={handleChange}
          />
          <Button
            variant="outlined"
            fullWidth
            sx={{ marginTop: '1rem' }}
            onClick={handleCloseModal}
          >
            Start
          </Button>
        </Box>
      </Modal>

      <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2} sx={{ marginBottom: '2rem' }}>
        {cardList.map((card) => (
          <Grid item xs={2} sm={4} md={3} key={card.id}>
            <Card
              card={card}
              modalOpen={modalOpen}
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
