import { Box, Button, Typography } from '@mui/material'
import { useCardContext } from 'contexts/CardContext'
import { boxStyles } from 'styles/styles'
import Modal from './Modal'

const GameOverModal = ({ open, onReset, onClose }) => {
  const { points } = useCardContext()

  const handleOnClick = () => {
    onReset()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={boxStyles}>
        <Typography component="h4" variant="h4" align="center" sx={{ marginBottom: '1rem' }}>
          GAME OVER
        </Typography>
        <Typography component="p" variant="p" align="center" sx={{ marginBottom: '1rem' }}>
          Total points : {points}
        </Typography>
        <Button variant="contained" fullWidth sx={{ marginTop: '1rem' }} onClick={handleOnClick}>
          Re-start
        </Button>
      </Box>
    </Modal>
  )
}

GameOverModal.defaultProps = {
  open: false,
  onStart: () => null,
  onClose: () => null,
}

export default GameOverModal
