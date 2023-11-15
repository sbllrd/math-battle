'use client'

import PlayersList from '@/components/PlayersList'
import { GameStatus } from '@/types'
import { Button, Divider, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import { useContext } from 'react'

import { GameContext } from '@/app/game-provider'
import PlayerTurnContainer from '@/components/PlayerTurnContainer'

const GameContainer = () => {
    const {
        gameStatus,
        players,
        resetGame,
        startGame,
    } = useContext(GameContext)

    return (
        <Grid
            gap={3}
            py={4}
            my={4}
            borderBottomColor='gray.700'
            borderBottomStyle='dotted'
            borderBottomWidth='3px'
        >
            {gameStatus === GameStatus.newGame && players.length < 1 &&
                <Heading textAlign='center' fontSize='lg'>Add at least one player to start a battle.</Heading>
            }
            {gameStatus === GameStatus.newGame && players.length > 0 &&
                <Grid gap={3}>
                    <VStack>
                        <Text fontWeight='bold'>Ready to start?</Text>
                        <Heading fontSize='x-large'>{players[0]?.name} goes first!</Heading>
                    </VStack>
                    <Button
                        colorScheme='orange'
                        size='lg'
                        variant='solid' 
                        width='full'
                        onClick={startGame}
                    >
                        Start Battle!
                    </Button>
                </Grid>
            }
            {gameStatus !== GameStatus.newGame && 
                <PlayerTurnContainer />
            }

            {gameStatus !== GameStatus.newGame &&
                <Button 
                    size='xs' 
                    variant='ghost' 
                    colorScheme='cyan' 
                    position='fixed' 
                    bottom={2} 
                    left={0} 
                    width='full'
                    onClick={resetGame}
                    py={2}
                >
                    Cancel Game
                </Button>
            }
        </Grid>
    )
}

export default GameContainer