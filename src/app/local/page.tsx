'use client'

import PlayersList from '@/components/PlayersList'
import { GameStatus } from '@/types'
import { Box } from '@chakra-ui/react'
import { useContext } from 'react'

import SettingsList from '@/components/SettingsList'
import { GameContext } from '../game-provider'
import GameContainer from '@/components/GameContainer'
import WelcomeHeading from '@/components/WelcomeHeading'

export default function LocalPage() {
    const { gameStatus } = useContext(GameContext)

    return (
        <Box mb={16}>
            {gameStatus === GameStatus.newGame && 
                <WelcomeHeading heading='New Pass & Play Battle' />
            }
            <PlayersList />
            <GameContainer />
            {gameStatus === GameStatus.newGame && 
                <SettingsList />
            }
        </Box>
    )
  }