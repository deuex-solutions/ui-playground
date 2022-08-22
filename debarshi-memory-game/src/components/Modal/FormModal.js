import { Box, Button, TextField, Typography } from '@mui/material'
import { modals } from 'constants/modals'
import { useModalContext } from 'contexts/ModalContext'
import { useRef } from 'react'
import { boxStyles } from 'styles/styles'
import Modal from './Modal'

const FormModal = ({ onStart }) => {
  const inputRef = useRef()
  const { state, dispatch } = useModalContext()

  const handleModal = (modalType) => dispatch({ type: modalType })

  const handleOnClick = () => {
    if (inputRef.current.value !== '') {
      onStart(inputRef.current.value)
      handleModal(null)
      inputRef.current.value = ''
    }
  }
  return (
    <Modal open={state.modal === modals.START_MODAL} onClose={handleModal}>
      <Box sx={boxStyles}>
        <Typography component="p" variant="p" align="center" sx={{ marginBottom: '1rem' }}>
          Enter your name to start the game
        </Typography>
        <TextField label="Enter your name" variant="outlined" fullWidth inputRef={inputRef} />
        <Button variant="outlined" fullWidth sx={{ marginTop: '1rem' }} onClick={handleOnClick}>
          Start
        </Button>
      </Box>
    </Modal>
  )
}

FormModal.defaultProps = {
  onStart: () => null,
}
export default FormModal
