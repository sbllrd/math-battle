'use client'

import { AddIcon, CheckIcon, CloseIcon, MinusIcon } from '@chakra-ui/icons'
import { Flex, Heading } from '@chakra-ui/react'
import '@fontsource/press-start-2p'

const Logo = () => {
    const iconProps = {
        color: 'gray.800',
        borderRadius: 'full',
        padding: 1,
        w: 6,
        h: 6
    }
    return (
        <Flex justifyContent='center' alignItems='center' flexDir='column' mt={3}>
            <Flex gap={2} width='fit-content'>
                <AddIcon {...iconProps} bgGradient='linear(to-br, purple.300, cyan.200)' />
                <MinusIcon {...iconProps} bgGradient='linear(to-tr, purple.300, cyan.200)' />
                <CloseIcon {...iconProps} bgGradient='linear(to-b, purple.300, cyan.200)' />
                <CheckIcon {...iconProps} bgGradient='linear(to-r, purple.300, cyan.200)' />
            </Flex>
            <Heading
                fontSize='2xl'
                py={2}
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