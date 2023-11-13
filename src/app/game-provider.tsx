'use client'

import { GameStatus } from '@/types'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

interface GameProviderProps {
  children: ReactNode
}

interface Player {
  name: string
}

interface GameContext {
  gameStatus: GameStatus
  setGameStatus: Dispatch<SetStateAction<GameStatus>>
}

const DEFAULT_GAME_CONTEXT: GameContext = {
  gameStatus: GameStatus.newGame,
  setGameStatus: () => {}
}

const GameContext = createContext<GameContext>(DEFAULT_GAME_CONTEXT)

function GameProvider({ children }: GameProviderProps) {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.newGame)

  return (
    <GameContext.Provider 
      value={{
          gameStatus,
          setGameStatus
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export {GameProvider as default, GameContext}
