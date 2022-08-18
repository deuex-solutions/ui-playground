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
        setCardList((prevList) => {
          return prevList.map((card) => {
            if (card.src === selectedCards.first.src) {
              return { ...card, isMatch: true }
            }
            return card
          })
        })
        setSelectedCards({})
        updatePoints()
      } else {
        setTimeout(() => {
          setSelectedCards({})
        }, 900)
      }
    }
  }, [cardList, selectedCards.first, selectedCards.second])

  const onCardSelected = useCallback(
    (card) => {
      if (selectedCards?.first && selectedCards.first.id !== card.id) {
        setSelectedCards({
          ...selectedCards,
          second: { ...card },
        })
      } else {
        setSelectedCards({ first: { ...card } })
      }
      setTurns((prev) => prev + 1)
    },
    [selectedCards]
  )

  const updatePoints = () => {
    setPoints((prev) => prev + 10)
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
