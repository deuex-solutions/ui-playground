import { Box, Modal as MuiModal } from '@mui/material'

const Modal = ({ open, handleClose, children }) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </Box>
    </MuiModal>
  )
}

Modal.defaultProps = {
  open: false,
  handleClose: () => null,
}
export default Modal
