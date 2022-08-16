import { createContext, useContext, useMemo, useState } from 'react'
import cardData from 'constants/cardData'

const CardContext = createContext()

export const useCardContext = () => useContext(CardContext)

const setInitialCards = () => {
  const list = [...cardData, ...cardData]
    .sort(() => Math.floor(Math.random() - 0.5))
    .map((card) => ({ ...card, id: Math.floor(Math.random() * 100) }))
  return list
}

const CardContextProvider = ({ children }) => {
  const [cardList, setCardList] = useState(setInitialCards)
  const [choices, setChoices] = useState({ choiceOne: null, choiceTwo: null })
  const [turns, setTurns] = useState(0)

  const value = useMemo(
    () => ({ cardList, setCardList, turns, setTurns, choices, setChoices }),
    [cardList, choices, turns]
  )

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export default CardContextProvider
