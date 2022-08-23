import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import levels from 'constants/levels'
import { useCardContext } from 'contexts/CardContext'
import { useRef, useState } from 'react'
import { boxStyles } from 'styles/baseStyles'
import Modal from './Modal'

const rules = [
  'Click on card to flip',
  'Find match for same card',
  "You'll get 5 minutes to answer",
  '10 Marks for correct answer',
  "At the end of the game, you'll see your final score",
]

const FormModal = ({ open, onStart, onClose }) => {
  const [gameLevel, setGameLevel] = useState(levels.EASY)
  const inputRef = useRef()

  const { onLevelChange } = useCardContext()

  const handleOnClick = () => {
    if (inputRef.current.value !== '') {
      onStart(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  const handleOnLevelChange = (event) => {
    const { value } = event.target
    onLevelChange(value)
    setGameLevel(value)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={boxStyles}>
        <Typography component="h5" variant="h5" align="center">
          Rules
        </Typography>

        {rules.map((rule, idx) => (
          <Typography key={idx} component="h5" variant="body2" align="left">
            {rule}
          </Typography>
        ))}

        <TextField
          label="Enter your name"
          variant="outlined"
          fullWidth
          inputRef={inputRef}
          sx={{ marginTop: '0.6rem' }}
        />

        <FormControl fullWidth sx={{ marginTop: '0.6rem' }}>
          <InputLabel id="select-game-label">Select Level</InputLabel>
          <Select
            labelId="select-game-label"
            label="Select Level"
            value={gameLevel}
            onChange={handleOnLevelChange}
          >
            <MenuItem value={levels.EASY}>Easy</MenuItem>
            <MenuItem value={levels.MEDIUM}>Medium</MenuItem>
            <MenuItem value={levels.HARD}>Hard</MenuItem>
          </Select>
        </FormControl>

        <Button variant="outlined" fullWidth sx={{ marginTop: '0.6rem' }} onClick={handleOnClick}>
          Start
        </Button>
      </Box>
    </Modal>
  )
}

FormModal.defaultProps = {
  open: false,
  onStart: () => null,
  onClose: () => null,
}
export default FormModal
