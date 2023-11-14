'use client'

import AnimatedIcon from '@/components/AnimatedIcon'
import AnswerInput from '@/components/AnswerInput'
import PlayersList from '@/components/PlayersList'
import NumberQuestion from '@/components/NumberQuestion'
import { GameStatus, GameSettings, Operation, Player, Question } from '@/types'
import { generateRandomNumbersArray } from '@/utils/generate-random-number-array'
import { getRandomItemFromArray } from '@/utils/get-random-item-from-array'
import { ArrowForwardIcon, TimeIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Grid, GridItem, Heading, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useStopwatch } from 'react-timer-hook';

// @ts-ignore
import useSound from 'use-sound'
import SettingsModal from '@/components/SettingsModal'
import SettingsList from '@/components/SettingsList'
import ResultsModal from '@/components/ResultsModal'
import AddPlayerModal from '@/components/AddPlayerModal'
import { useReward } from 'react-rewards'
import { GameContext } from './game-provider'
import { useSearchParams } from 'next/navigation'

const DEFAULT_GAME_SETTINGS: GameSettings = {
    min_number: 50,
    max_number: 300,
    number_count: 2,
    operations: [Operation.addition],
    rounds_count: 5
}

const TEST_GAME_SETTINGS: GameSettings = {
    min_number: 1,
    max_number: 1,
    number_count: 2,
    operations: [Operation.addition],
    rounds_count: 5
}


const TEST_PLAYERS: Player[] = [
    {id: 1, name: 'Player 1', score: 0},
    {id: 2, name: 'Player 2', score: 0},
    {id: 3, name: 'Player 3', score: 0}
]

export default function RootPage() {
    const searchParams = useSearchParams()
    const isTest = searchParams.get('test') === 'true'
    const { gameStatus, setGameStatus} = useContext(GameContext)
    const [currentQuestion, setCurrentQuestion] = useState<Question>()
    const [gameSettings, setGameSettings] = useState<GameSettings>(isTest ? TEST_GAME_SETTINGS : DEFAULT_GAME_SETTINGS)
    const [players, setPlayers] = useState<Player[]>(isTest ? TEST_PLAYERS : [])
    const [currentRound, setCurrentRound] = useState<number>(0)
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(-1)
    const [playCorrectSound] = useSound('/sounds/correct.mp3')
    const [playIncorrectSound] = useSound('/sounds/incorrect.mp3')
    const { isOpen: isResultsModalOpen, onOpen: openResultsModal, onClose: closeResultsModal } = useDisclosure()
    const { isOpen: isSettingsModalOpen, onOpen: openSettingsModal, onClose: closeSettingsModal } = useDisclosure()
    const { isOpen: isAddPlayerModalOpen, onOpen: openAddPlayerModal, onClose: closeAddPlayerModal } = useDisclosure()
    const { reward: answerReward } = useReward('answerReward', 'confetti', {
        elementCount: 200,
        lifetime: 100
    });
    const { reward: resultsReward } = useReward('resultsReward', 'balloons', {
        elementCount: 20,
        spread: 90,
        startVelocity: 5,
        zIndex: 2000,
        elementSize: 30
    });

    const {
        totalSeconds: questionTimerTotalSeconds,
        isRunning: isQuestionTimerRunning,
        start: startQuestionTimer,
        pause: stopQuestionTimer,
        reset: resetQuestionTimer,
      } = useStopwatch();

    const getCorrectAnswer = (numbers: number[] , operation: Operation) => {
        switch (operation) {
            case Operation.addition:
                return numbers.reduce((a,b)=>a+b)
                break
            case Operation.subtraction:
                return numbers.reduce((a,b)=>a-b)
        }
    }

    const generateQuestion = () => {
        setGameStatus(GameStatus.unanswered)
        resetQuestionTimer()
        stopQuestionTimer()
        const {number_count, min_number, max_number} = gameSettings
        const operation = getRandomItemFromArray(gameSettings.operations)
        const numbers = generateRandomNumbersArray({
            number_count,
            min_number,
            max_number
        })
        const correctAnswer = getCorrectAnswer(numbers, operation);
        setCurrentQuestion({
            numbers,
            operation,
            correctAnswer
        })
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
        isCorrect ? setGameStatus(GameStatus.correct) : setGameStatus(GameStatus.incorrect)
        if (isCorrect) {
            answerReward()
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

        const updatedPlayers = players.map(player => {
            if (player.id === updatedCurrentPlayer.id) {
                return updatedCurrentPlayer
            } else {
                return player
            }
        })
        
        setPlayers(updatedPlayers)
    }

    const getNextPlayerIndex = () => {
        return currentPlayerIndex + 1 < players.length ? currentPlayerIndex + 1 : 0
    }

    const isLastTurn = () => {
        return currentRound >= gameSettings.rounds_count && currentPlayerIndex === players.length - 1;
    }

    const startNewGame = () => {
        const playersWithScoreReset = players.map((player) => {
            return {
                ...player,
                score: 0
            }
        });
        setPlayers(playersWithScoreReset)
        setCurrentQuestion(undefined)
        setGameStatus(GameStatus.newGame)
        setCurrentRound(0)
        setCurrentPlayerIndex(-1)
        closeResultsModal()
    }

    const handleNextTurnButtonClick = () => {
        if (isLastTurn()) {
            resultsReward()
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
        else if (gameStatus === GameStatus.newGame) {
            return `Start Game`
        }
        else {
            return `Start ${players[getNextPlayerIndex()].name}'s turn`
        }
    }

    const handleSettingsButtonClick = () => {
        openSettingsModal()
    }

    const handleSettingsUpdate = (settingsName: string, value: any) => {
        switch (settingsName) {
            case 'min_number':
                setGameSettings({
                    ...gameSettings,
                    min_number: Number(value)
                })
                break
            case 'max_number':
                setGameSettings({
                    ...gameSettings,
                    max_number: Number(value)
                })
                break
            case 'number_count':
                if (Number(value) < 2 || Number(value) > 5) break
                setGameSettings({
                    ...gameSettings,
                    number_count: Number(value)
                })
                break
            case 'rounds_count':
                if (Number(value) < 1) break
                setGameSettings({
                    ...gameSettings,
                    rounds_count: Number(value)
                })
                break
            case 'operations':
                setGameSettings({
                    ...gameSettings,
                    operations: value
                })
                break
        }
    }

    const addNewPlayer = (playerName: Player['name']) => {
        const newPlayer = {
            id: players.length + 1,
            name: playerName,
            score: 0
        }
        setPlayers([
            ...players,
            newPlayer
        ])
    }

    const handleAddPlayerButtonClick = () => {
        openAddPlayerModal()
    }

    return (
        <Grid mb={16}>
            {gameStatus === GameStatus.newGame &&
                <GridItem 
                    textAlign='center'
                    borderTopColor='gray.700' 
                    borderTopStyle='dotted'
                    borderTopWidth='3px'
                    py={4}
                >
                    <Heading fontSize='x-large'>Welcome!</Heading>
                    <Text>Add at least one player to start a game.</Text>
                </GridItem>
            }
            <PlayersList 
                allowAddNewPlayer={gameStatus === GameStatus.newGame}
                currentPlayerIndex={currentPlayerIndex} 
                handleAddPlayerButtonClick={handleAddPlayerButtonClick} 
                players={players} 
            />
            {gameStatus === GameStatus.newGame && <SettingsList handleSettingsButtonClick={handleSettingsButtonClick} settings={gameSettings} />}
            {gameStatus === GameStatus.newGame && players.length > 0 &&
                <VStack
                    borderTopColor='gray.700' 
                    borderTopStyle='dotted'
                    borderTopWidth='3px'
                    pt={4}
                >
                    <Text fontWeight='bold'>Ready to start?</Text>
                    <Heading>{players[getNextPlayerIndex()].name} goes first!</Heading>
                </VStack>
            }
            {currentQuestion &&
                <Grid justifyContent='center' gap={4}
                    borderTopColor='gray.700' 
                    borderTopStyle='dotted'
                    borderTopWidth='3px' 
                    pt={4}
                >
                    <VStack spacing={0}>
                        <Text fontSize='sm'>Round <b>{currentRound}</b> of {gameSettings.rounds_count}</Text>
                        <Heading textAlign='center' fontSize='x-large'>{players[currentPlayerIndex].name}&apos;s turn:</Heading>
                    </VStack>
                    <NumberQuestion question={currentQuestion} />
                    <AnswerInput 
                        gameStatus={gameStatus}
                        correctAnswer={currentQuestion.correctAnswer}
                        onSubmit={handleAnswerSubmit}
                    /> 
                    <Flex justifyContent='center'>
                        <Box id="answerReward" />
                    </Flex>
                    {isQuestionTimerRunning && (
                        <Center alignItems='center' gap={2}>
                            <TimeIcon w={4} h={4} /> <>{questionTimerTotalSeconds}s</>
                        </Center>
                    )}
                    <Center>
                    {gameStatus !== GameStatus.unanswered && <AnimatedIcon variant={gameStatus} />}
                    </Center>
                </Grid>
            }
            {players.length > 0 && 
                <Grid gap={4} mt={4}>
                    {gameStatus !== GameStatus.unanswered &&
                        <Button 
                            colorScheme='orange'
                            size='lg'
                            variant='solid' 
                            onClick={handleNextTurnButtonClick}
                            rightIcon={<ArrowForwardIcon />}
                        >
                            <>{ getNextButtonText() }</>
                        </Button>
                    }
                </Grid>
            }

            <ResultsModal
                players={players}
                isOpen={isResultsModalOpen}
                onClose={closeResultsModal}
                startNewGame={startNewGame}
            />

            <SettingsModal
                settings={gameSettings}
                handleSettingsUpdate={handleSettingsUpdate}
                isOpen={isSettingsModalOpen}
                onClose={closeSettingsModal}
            />

            <AddPlayerModal
                addNewPlayer={addNewPlayer}
                isOpen={isAddPlayerModalOpen}
                onClose={closeAddPlayerModal}
            />
            <Flex justifyContent='center'>
                <Box id='resultsReward'/>
            </Flex>
        </Grid>
    )
  }