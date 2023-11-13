'use client'

import { GameContext } from '@/app/game-provider'
import { GameStatus } from '@/types'
import { AddIcon, CheckIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons'
import { Flex, Heading } from '@chakra-ui/react'
import '@fontsource/press-start-2p'
import { useContext } from 'react'

const Logo = () => {
    const {gameStatus} = useContext(GameContext)
    const isCompact = gameStatus !== GameStatus.newGame;

    const iconProps = {
        color: 'gray.800',
        borderRadius: 'full',
        padding: 1,
        w: 6,
        h: 6
    }
    return (
        <Flex justifyContent='center' alignItems='center' flexDir='column' mt={isCompact ? 3 : 6}>
            {!isCompact &&
                <Flex gap={2} width='fit-content'>
                    <AddIcon {...iconProps} bgGradient='linear(to-br, purple.300, cyan.200)' />
                    <MinusIcon {...iconProps} bgGradient='linear(to-tr, purple.300, cyan.200)' />
                    <CloseIcon {...iconProps} bgGradient='linear(to-b, purple.300, cyan.200)' />
                    <CheckIcon {...iconProps} bgGradient='linear(to-r, purple.300, cyan.200)' />
                </Flex>
            }

            <Heading
                fontSize={isCompact ? 'xl' : '3xl'}
                pt={isCompact ? 0 : 4}
                pb={2}
                textAlign='center'
                bgGradient='linear(to-b, purple.100, cyan.500)'
                bgClip='text'
                fontFamily={`'Press Start 2P'`}
            >
                Math Battle
            </Heading>
        </Flex>
    )
}

export default Logo