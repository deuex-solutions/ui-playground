import toast from 'react-hot-toast'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import cardData from 'constants/cardData'
import gameLevels from 'constants/levels'

const CardContext = createContext()

export const useCardContext = () => useContext(CardContext)

const getShuffledCards = (multiplier = 4) => {
  const cards = cardData.slice(0, cardData.length - multiplier)
  const list = [...cards, ...cards]
    .sort(() => Math.floor(Math.random() - 0.5))
    .map((card) => ({ ...card, id: uuidv4() }))
  return list
}

const CardContextProvider = ({ children }) => {
  const [cardList, setCardList] = useState(getShuffledCards)
  const [selected, setSelected] = useState({})
  const [turns, setTurns] = useState(0)
  const [points, setPoints] = useState(0)

  useEffect(() => {
    if (selected?.first && selected?.second) {
      if (selected.first?.src === selected.second?.src) {
        setCardList((prevList) => {
          return prevList.map((card) => {
            if (card.src === selected.first.src) {
              return { ...card, isMatch: true }
            }
            return card
          })
        })
        setSelected({})
        // eslint-disable-next-line no-use-before-define
        updatePoints()
      } else {
        setTimeout(() => {
          setSelected({})
        }, 500)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardList, selected.first, selected.second])

  const onSelected = useCallback(
    (card) => {
      if (selected?.first && selected.first.id !== card.id) {
        setSelected({
          ...selected,
          second: { ...card },
        })
      } else {
        setSelected({ first: { ...card } })
      }
      setTurns((prev) => prev + 1)
    },
    [selected]
  )

  const updatePoints = useCallback(() => {
    setPoints((prev) => prev + 10)
    toast.success('Correct Answer', { duration: 1500 })
  }, [])

  const reset = useCallback((resetCards = true) => {
    setSelected({})
    setTurns(0)
    setPoints(0)
    if (resetCards) {
      setCardList(getShuffledCards())
    }
  }, [])

  const onLevelChange = useCallback(
    (currentLevel) => {
      const { EASY, HARD, MEDIUM } = gameLevels

      let cards
      if (currentLevel === EASY) {
        cards = getShuffledCards(4)
      }
      if (currentLevel === MEDIUM) {
        cards = getShuffledCards(2)
      }
      if (currentLevel === HARD) {
        cards = getShuffledCards(0)
      }

      reset(false)
      setCardList(cards)
    },
    [reset]
  )

  const value = useMemo(
    () => ({
      cardList,
      turns,
      selected,
      points,
      onSelected,
      reset,
      onLevelChange,
    }),
    [cardList, turns, selected, points, onSelected, reset, onLevelChange]
  )

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export default CardContextProvider
