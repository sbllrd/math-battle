import { Player } from '@/types'
import { StarIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UseModalProps } from '@chakra-ui/react'
import { useEffect } from 'react'
// @ts-ignore
import useSound from 'use-sound'

interface ResultsModalProps {
    players: Player[]
    startNewGame: () => void
}

type Props = ResultsModalProps & UseModalProps

const ResultsModal = ({
    players,
    startNewGame,
    isOpen,
    onClose,
}: Props) => {
    const [playTadaSound] = useSound('/sounds/tada.mp3')
    
    const highestScore = (): number => {
        return Math.max(...players.map(player => player.score))
    }

    useEffect(() => {
        if (isOpen) {
            playTadaSound()
        }
    }, [isOpen, playTadaSound])

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            closeOnOverlayClick={false} 
            isCentered 
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent bg='gray.800' mx={4}>
                <ModalHeader>Game Results</ModalHeader>
                <ModalBody>
                    {[...players].sort((a,b) => b.score - a.score).map((player, index) => (
                        <Flex key={player.id} justifyContent='space-between' alignItems='center'>
                            <Flex 
                                fontSize='x-large'
                                fontWeight='bold'
                                alignItems='center'
                                gap={2}
                            >
                                <StarIcon color={highestScore() === player.score ? 'yellow.500' : 'transparent'} w={4} h={4}/> {player.name}
                            </Flex>
                            <Box fontSize='x-large'>{player.score}</Box>
                        </Flex>
                    ))}
                <Flex justifyContent='center'>
                    <Box id="balloons" />
                </Flex>
                </ModalBody>
                <ModalFooter justifyContent='center'>
                    <Button 
                        onClick={startNewGame} 
                        variant='solid' 
                        colorScheme='cyan' 
                        size='lg' 
                        width='full'
                    >
                            New Game
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ResultsModal