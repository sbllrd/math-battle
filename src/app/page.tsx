'use client'

import AnimatedIcon from '@/components/AnimatedIcon'
import AnswerInput from '@/components/AnswerInput'
import PlayersList from '@/components/PlayersList'
import NumberQuestion from '@/components/NumberQuestion'
import { AnswerState, GameSettings, Operation, Player, Question } from '@/types'
import { generateRandomNumbersArray } from '@/utils/generate-random-number-array'
import { getRandomItemFromArray } from '@/utils/get-random-item-from-array'
import { ArrowForwardIcon, MinusIcon, SettingsIcon, StarIcon, TimeIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Grid, GridItem, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, SimpleGrid, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import Confetti from 'react-dom-confetti'
import { useRouter } from 'next/navigation'
import { useStopwatch } from 'react-timer-hook';

// @ts-ignore
import useSound from 'use-sound'

const DEFAULT_GAME_SETTINGS: GameSettings = {
    minNumber: 100,
    maxNumber: 999,
    numberCount: 2,
    operations: [Operation.addition],
    roundsCount: 1
}

const DEFAULT_PLAYERS: Player[] = [
    {id: 1, name: 'Dad', score: 0},
    {id: 2, name: 'Declan', score: 0}
]

export default function RootPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState<Question>()
    const [gameSettings, setGameSettings] = useState<GameSettings>(DEFAULT_GAME_SETTINGS)
    const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.newGame)
    const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS)
    const [currentRound, setCurrentRound] = useState<number>(0)
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(-1)
    const [settingsError, setSettingsError] = useState('')
    const [playCorrectSound] = useSound('/sounds/correct.mp3')
    const [playIncorrectSound] = useSound('/sounds/incorrect.mp3')
    const { isOpen: isResultsModalOpen, onOpen: openResultsModal, onClose: closeResultsModal } = useDisclosure()
    const { isOpen: isSettingsModalOpen, onOpen: openSettingsModal, onClose: closeSettingsModal } = useDisclosure()

    const {
        totalSeconds: questionTimerTotalSeconds,
        isRunning: isQuestionTimerRunning,
        start: startQuestionTimer,
        pause: stopQuestionTimer,
        reset: resetQuestionTimer,
      } = useStopwatch();

    const generateQuestion = () => {
        resetQuestionTimer()
        stopQuestionTimer()
        const {numberCount, minNumber, maxNumber} = gameSettings
        const operation = getRandomItemFromArray(gameSettings.operations)
        const numbers = generateRandomNumbersArray({
            numberCount,
            minNumber,
            maxNumber
        })
        const correctAnswer = numbers.reduce((a,b)=>a+b)
        setCurrentQuestion({
            numbers,
            operation,
            correctAnswer
        })
        setAnswerState(AnswerState.unanswered)
        startQuestionTimer()
    }

    const getQuestionScore = (elapsedSeconds: number) => {
        return Math.max(10, 100 - Math.floor(elapsedSeconds / 5) * 5)
    }

    const handleAnswerSubmit = (answer: number) => {
        resetQuestionTimer()
        stopQuestionTimer()
        const elapsedTime = questionTimerTotalSeconds;
        const isCorrect = answer === currentQuestion?.correctAnswer
        isCorrect ? setAnswerState(AnswerState.correct) : setAnswerState(AnswerState.incorrect)
        if (isCorrect) {
            playCorrectSound()
        } else {
            playIncorrectSound()
        }

        const thisQuestionScore = isCorrect ? getQuestionScore(elapsedTime) : 0;
        const currentPlayer = players[currentPlayerIndex]

        const updatedCurrentPlayer = {
            ...currentPlayer,
            score: currentPlayer.score + thisQuestionScore
        }

        console.log('updatedCurrentPlayer', updatedCurrentPlayer)

        const updatedPlayers = players.with(currentPlayerIndex, updatedCurrentPlayer)
        setPlayers(updatedPlayers)
    }

    const getNextPlayerIndex = () => {
        return currentPlayerIndex + 1 < players.length ? currentPlayerIndex + 1 : 0
    }

    const isLastTurn = () => {
        return currentRound === gameSettings.roundsCount && currentPlayerIndex === players.length - 1;
    }

    const startNewGame = () => {
        setPlayers(DEFAULT_PLAYERS)
        setCurrentQuestion(undefined)
        setAnswerState(AnswerState.newGame)
        setCurrentRound(0)
        setCurrentPlayerIndex(-1)
        closeResultsModal()
    }

    const handleNextTurnButtonClick = () => {
        if (isLastTurn()) {
            openResultsModal()
            return;
        }

        const nextPlayerIndex = getNextPlayerIndex()
        setCurrentPlayerIndex(nextPlayerIndex)
        generateQuestion()

        if (nextPlayerIndex === 0) {
            setCurrentRound(currentRound + 1)
        }
    }

    const getNextButtonText = () => {
        if (isLastTurn()) {
            return 'Finish Game'
        }
        else {
            return `Start ${players[getNextPlayerIndex()].name}'s turn`
        }
    }

    const highestScore = (): number => {
        return Math.max(...players.map(player => player.score))
    }

    const handleSettingsButtonClick = () => {
        openSettingsModal()
    }

    const handleSettingsUpdate = (settingsName: string, newValue: any) => {
        console.log('newValue', settingsName)
        setSettingsError('');

        switch (settingsName) {
            case 'minNumber':
                setGameSettings({
                    ...gameSettings,
                    minNumber: Number(newValue)
                })
                break
            case 'maxNumber':
                setGameSettings({
                    ...gameSettings,
                    maxNumber: Number(newValue)
                })
                break
            case 'numberCount':
                if (Number(newValue) < 2 || Number(newValue) > 5) break
                setGameSettings({
                    ...gameSettings,
                    numberCount: Number(newValue)
                })
                break
            case 'roundsCount':
                if (Number(newValue) < 1) break
                setGameSettings({
                    ...gameSettings,
                    roundsCount: Number(newValue)
                })
                break
        }
    }

    return (
        <Grid gap={4}>
            <PlayersList currentPlayerIndex={currentPlayerIndex} players={players} />
            {answerState === AnswerState.newGame && 
                <VStack>
                    <Text fontWeight='bold'>New Game...</Text>
                    <Heading>{players[getNextPlayerIndex()].name} goes first!</Heading>
                </VStack>
            }
            {currentQuestion &&
                <Grid justifyContent='center' gap={4}>
                    <div>{currentQuestion.correctAnswer}</div>
                    <VStack spacing={0}>
                        <Text fontSize='medium'>Round {currentRound} of {gameSettings.roundsCount}</Text>
                        <Heading textAlign='center' fontSize='large'>{players[currentPlayerIndex].name}&apos;s turn:</Heading>
                    </VStack>
                    <NumberQuestion question={currentQuestion} />
                    <AnswerInput 
                        answerState={answerState}
                        correctAnswer={currentQuestion.correctAnswer}
                        onSubmit={handleAnswerSubmit} 
                    /> 
                    {isQuestionTimerRunning && (
                        <Center alignItems='center' gap={2}>
                            <TimeIcon w={4} h={4} /> <>{questionTimerTotalSeconds}s</>
                        </Center>
                    )}

                    <Center>
                    {!isResultsModalOpen &&
                        <Confetti 
                            active={answerState === AnswerState.correct} 
                            config={{
                                elementCount: 200,
                                spread: 200
                            }}
                        />
                    }
                    {answerState !== AnswerState.unanswered && <AnimatedIcon variant={answerState} />}
                    </Center>
                </Grid>
            }
            <Grid gap={4}>
                {answerState !== AnswerState.unanswered &&
                    <Button 
                        colorScheme='cyan'
                        size='lg'
                        variant='solid' 
                        onClick={handleNextTurnButtonClick}
                        rightIcon={<ArrowForwardIcon />}
                    >
                        <>{ getNextButtonText() }</>
                    </Button>
                }
                {answerState === AnswerState.newGame &&
                    <Button 
                        colorScheme='cyan'
                        size='lg'
                        variant='outline' 
                        onClick={handleSettingsButtonClick}
                        rightIcon={<SettingsIcon />}
                    >
                        <>Change Settings</>
                    </Button>
                }
            </Grid>
            <Modal 
                isOpen={isResultsModalOpen} 
                onClose={closeResultsModal} 
                closeOnOverlayClick={false} 
                isCentered 
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent bg='gray.800' mx={4}>
                    <ModalHeader>Game Results</ModalHeader>
                    <ModalBody>
                        {players.sort((a,b) => b.score - a.score).map((player, index) => (
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
                    </ModalBody>
                    <ModalFooter justifyContent='center'>
                        <Button onClick={startNewGame} variant='solid' colorScheme='cyan'>New Game</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal 
                isOpen={isSettingsModalOpen} 
                onClose={closeSettingsModal} 
                closeOnOverlayClick={false} 
                isCentered 
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent bg='gray.800' mx={4}>
                    <ModalHeader>Game Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Grid gap={6}>
                            {settingsError && 
                                <GridItem>
                                    {<Box color='red.500'>{settingsError}</Box>}
                                </GridItem>
                            }
                            <GridItem>
                                <Text fontSize='small' fontWeight='bold' mb={2}>Possible numbers range</Text>
                                <HStack spacing={2}>
                                    <Box>
                                        <NumberInput 
                                            value={gameSettings.minNumber}
                                            onChange={(newValue) => handleSettingsUpdate('minNumber', newValue)} 
                                        >
                                            <NumberInputField />
                                        </NumberInput>
                                    </Box>
                                    <Box><MinusIcon /></Box>
                                    <Box>
                                        <NumberInput 
                                            value={gameSettings.maxNumber}
                                            onChange={(newValue) => handleSettingsUpdate('maxNumber', newValue)} 
                                        >
                                            <NumberInputField />
                                        </NumberInput>
                                    </Box>
                                </HStack>
                            </GridItem>
                            <GridItem>
                                <Text fontSize='small' fontWeight='bold' mb={2}>How many numbers</Text>
                                <NumberInput 
                                    value={gameSettings.numberCount}
                                    onChange={(newValue) => handleSettingsUpdate('numberCount', newValue)} 
                                >
                                    <NumberInputField />
                                    <NumberInputStepper bg='white'>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </GridItem>
                            <GridItem>
                                <Text fontSize='small' fontWeight='bold' mb={2}>Number of rounds</Text>
                                <NumberInput 
                                    value={gameSettings.roundsCount}
                                    onChange={(newValue) => handleSettingsUpdate('roundsCount', newValue)} 
                                >
                                    <NumberInputField />
                                    <NumberInputStepper bg='white'>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </GridItem>
                        </Grid>
                        {/* {
                                operations: [Operation.addition],
                        } */}
                    </ModalBody>
                    <ModalFooter justifyContent='center'>
                        <Button onClick={closeSettingsModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Grid>
    )
  }