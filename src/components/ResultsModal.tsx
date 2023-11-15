import { GameContext } from '@/app/game-provider'
import { StarIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UseModalProps } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { useReward } from 'react-rewards'
// @ts-ignore
import useSound from 'use-sound'

type Props = UseModalProps

const ResultsModal = ({
    isOpen,
    onClose,
}: Props) => {
    const { 
        players,
        resetGame,
        getPlayerScore
    } = useContext(GameContext)

    const [playTadaSound] = useSound('/sounds/tada.mp3')
    const { reward: resultsReward } = useReward('resultsReward', 'balloons', {
        elementCount: 20,
        spread: 90,
        startVelocity: 5,
        zIndex: 2000,
        elementSize: 30
    });

    const playersScoreList = players.map((player) => {
        return {
            name: player.name,
            score: getPlayerScore(player.id)
        }
    }).sort((a,b) => b.score - a.score)

    const highestScore = (): number => {
        return Math.max(...playersScoreList.map(player => player.score))
    }

    const handleNewGameButtonClick = () => {
        resetGame()
        onClose()
    }

    useEffect(() => {
        if (isOpen) {
            playTadaSound()
            setTimeout(() => {
                resultsReward()
            }, 500)
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
                <ModalHeader>Battle Results</ModalHeader>
                <ModalBody>
                    {playersScoreList.map((player, index) => (
                        <Flex key={player.name} justifyContent='space-between' alignItems='center'>
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
                    <Box id='resultsReward'/>
                </Flex>
                </ModalBody>
                <ModalFooter justifyContent='center'>
                    <Button 
                        onClick={handleNewGameButtonClick} 
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