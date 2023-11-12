'use client'
 
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

interface GameProviderProps {
  children: ReactNode
}

interface Player {
  name: string
}

interface GameContext {
  currentPlayer?: Player
  setCurrentPlayer?: Dispatch<SetStateAction<Player>>
}
 
export const GameContext = createContext<GameContext>({})
 
export default function GameProvider({ children }: GameProviderProps) {
  const [currentPlayer, setCurrentPlayer] = useState<Player>({name: 'Test Name'});
  return <GameContext.Provider 
    value={{
      currentPlayer,
      setCurrentPlayer
    }}
  >
    {children}
  </GameContext.Provider>
}