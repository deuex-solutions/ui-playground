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
  const [selectedCards, setSelectedCards] = useState({})
  const [turns, setTurns] = useState(0)
  const [points, setPoints] = useState(0)

  useEffect(() => {
    if (selectedCards?.first && selectedCards?.second) {
      if (selectedCards.first?.src === selectedCards.second?.src) {
        setCardList((prevList) =>
          prevList.map((card) => {
            if (card.src === selectedCards.first.src) {
              return { ...card, isMatch: true }
            }
            return card
          })
        )
        updatePoints()
      } else {
        setTimeout(() => {
          setSelectedCards({})
        }, 900)
      }
    }
  }, [selectedCards?.first, selectedCards?.second])

  const onCardSelected = useCallback((card) => {
    setSelectedCards((prevCards) => {
      if (prevCards?.first && prevCards.first.id !== card.id) {
        return {
          ...prevCards,
          second: { ...card },
        }
      }
      return { first: { ...card } }
    })

    setTurns((prev) => prev + 1)
  }, [])

  const updatePoints = () => {
    setPoints((prev) => prev + 10)
    setSelectedCards({})
    toast.success('Correct Answer', { duration: 1500 })
  }

  const reset = useCallback((resetCards = true) => {
    setSelectedCards({})
    setTurns(0)
    setPoints(0)
    if (resetCards) {
      setCardList(getShuffledCards())
    }
  }, [])

  const onLevelChange = useCallback(
    (currentLevel) => {
      const { HARD, MEDIUM } = gameLevels

      if (currentLevel === HARD) {
        const cards = getShuffledCards(0)
        setCardList([...cards])
      } else if (currentLevel === MEDIUM) {
        setCardList(getShuffledCards(2))
      } else {
        setCardList(getShuffledCards(4))
      }
      reset(false)
    },
    [reset]
  )

  const value = useMemo(
    () => ({
      cardList,
      turns,
      selectedCards,
      points,
      onCardSelected,
      reset,
      onLevelChange,
    }),
    [cardList, turns, selectedCards, points, onCardSelected, reset, onLevelChange]
  )

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export default CardContextProvider
