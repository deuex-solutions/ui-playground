import { Box, Button, Typography } from '@mui/material'
import { modals } from 'constants/modals'
import { useCardContext } from 'contexts/CardContext'
import { useModalContext } from 'contexts/ModalContext'
import { boxStyles } from 'styles/styles'
import Modal from './Modal'

const GameOverModal = ({ onReset }) => {
  const { points } = useCardContext()
  const { state, dispatch } = useModalContext()

  const handleModal = (modalType) => dispatch({ type: modalType })

  const handleOnClick = () => {
    onReset()
    handleModal(modals.START_MODAL)
  }

  return (
    <Modal open={state.modal === modals.END_MODAL} onClose={() => handleModal(modals.END_MODAL)}>
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
  onStart: () => null,
}

export default GameOverModal
