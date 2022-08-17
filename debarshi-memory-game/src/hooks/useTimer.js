import { useCallback, useEffect, useRef, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND

const FIVE_MINS = 5 * MINUTE
export const useTimer = (startTime) => {
  const [timer, setTimer] = useState(startTime || FIVE_MINS)
  const [isTimerExpired, setIsTimerExpired] = useState(false)
  const timerId = useRef()

  const clearTimer = useCallback(() => {
    clearInterval(timerId.current)
    timerId.current = null
  }, [])

  useEffect(() => {
    if (timer <= 0 && !isTimerExpired) {
      setIsTimerExpired(true)
      clearTimer()
    }
  }, [clearTimer, isTimerExpired, timer])

  const startTimer = useCallback(() => {
    if (timerId.current) return
    timerId.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          return FIVE_MINS
        }
        return prev - 1000
      })
    }, 1000)
  }, [])

  const getFormattedTime = useCallback((time) => {
    const mins = Math.floor(time / MINUTE)
    const secs = Math.floor((time % MINUTE) / SECOND)

    return `${mins}:${secs}`
  }, [])

  const time = getFormattedTime(timer)
  return [time, isTimerExpired, startTimer, clearTimer]
}
