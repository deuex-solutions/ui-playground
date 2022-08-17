import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { useTimer } from 'hooks/useTimer'

const Timer = ({ onExpire }) => {
  const [time, isTimerExpired, startTimer] = useTimer()

  useEffect(() => {
    startTimer()
  }, [startTimer])

  useEffect(() => {
    if (isTimerExpired) {
      onExpire()
    }
  }, [isTimerExpired, onExpire])

  return (
    <Typography align="center" variant="h4">
      {time}
    </Typography>
  )
}

export default Timer
