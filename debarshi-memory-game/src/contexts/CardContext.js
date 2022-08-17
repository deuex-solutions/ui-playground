import toast from 'react-hot-toast'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import cardData from 'constants/cardData'

const CardContext = createContext()

export const useCardContext = () => useContext(CardContext)

const getShuffledCards = () => {
  const list = [...cardData, ...cardData]
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
        }, 1000)
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

  const reset = useCallback(() => {
    setCardList(getShuffledCards())
    setSelected({})
    setTurns(0)
    setPoints(0)
  }, [])

  const value = useMemo(
    () => ({ cardList, turns, selected, points, onSelected, reset }),
    [cardList, turns, selected, points, onSelected, reset]
  )

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export default CardContextProvider
