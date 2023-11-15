'use client'

import PlayersList from '@/components/PlayersList'
import { GameStatus } from '@/types'
import { Box, Button, Divider, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'

import SettingsList from '@/components/SettingsList'
import { GameContext } from '../game-provider'
import PlayerTurnContainer from '@/components/PlayerTurnContainer'
import GameContainer from '@/components/GameContainer'
import WelcomeHeading from '@/components/WelcomeHeading'

export default function LocalPage() {
    const { gameStatus } = useContext(GameContext)

    return (
        <Box mb={16}>
            {gameStatus === GameStatus.newGame && 
                <WelcomeHeading
                    heading='New Pass & Play Battle'
                    subheading={'Add at least one player to start a battle.'}
                />
            }
            <PlayersList />
            <GameContainer />
            {gameStatus === GameStatus.newGame && 
                <SettingsList />
            }
        </Box>
    )
  }