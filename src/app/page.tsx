'use client'

import AnimatedIcon from '@/components/AnimatedIcon'
import AnswerInput from '@/components/AnswerInput'
import OperationSymbol from '@/components/OperationSymbol'
import PlayersList from '@/components/PlayersList'
import NumbersQuestion from '@/components/Question'
import { AnswerState, GameSettings, Operation, Player, Question } from '@/types'
import { generateRandomNumberInRange } from '@/utils/generate-random-number'
import { generateRandomNumbersArray } from '@/utils/generate-random-number-array'
import { getRandomItemFromArray } from '@/utils/get-random-item-from-array'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Confetti from 'react-dom-confetti'
import useSound from 'use-sound'

interface RootPageProps {
    children: React.ReactNode
}

const DEFAULT_GAME_SETTINGS: GameSettings = {
    minNumber: 1,
    maxNumber: 1,
    numberCount: 2,
    operations: [Operation.addition]
}

const DEFAULT_PLAYERS: Player[] = [
    {id: 1, name: 'Dad', score: 0},
    {id: 2, name: 'Declan', score: 0}
]

export default function RootPage({children}: RootPageProps) {
    const [currentQuestion, setCurrentQuestion] = useState<Question>()
    const [gameSettings, setGameSettings] = useState<GameSettings>(DEFAULT_GAME_SETTINGS)
    const [answerState, setAnswerState] = useState<AnswerState>(AnswerState.newGame)
    const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS)
    const [currentRound, setCurrentRound] = useState<number>(0)
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(generateRandomNumberInRange(0, players.length))
    const [playCorrectSound] = useSound('/sounds/correct.mp3')
    const [playIncorrectSound] = useSound('/sounds/incorrect.mp3')

    const generateQuestion = () => {
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
    }

    const handleAnswerSubmit = (answer: number) => {
        const isCorrect = answer === currentQuestion?.correctAnswer
        isCorrect ? setAnswerState(AnswerState.correct) : setAnswerState(AnswerState.incorrect)
        if (isCorrect) {
            playCorrectSound()
        } else {
            playIncorrectSound()
        }

        const thisQuestionScore = isCorrect ? 1 : 0;
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

    const handleNextTurnButtonClick = () => {
        setCurrentPlayerIndex(getNextPlayerIndex())
        generateQuestion()
        setCurrentRound(currentRound + 1)
    }

    return (
        <Grid gap={8}>
            <PlayersList currentPlayerIndex={currentPlayerIndex} players={players} />
            {answerState === AnswerState.newGame && 
                <VStack>
                    <Text fontWeight='bold'>New Game...</Text>
                    <Heading>{players[getNextPlayerIndex()].name} goes first!</Heading>
                </VStack>
            }
            {currentQuestion &&
                <Grid justifyContent='center' gap={4}>
                    {/* <div>{currentQuestion.correctAnswer}</div> */}
                    <VStack>
                        <Text fontWeight='bold'>Round {currentRound}</Text>
                        <Heading textAlign='center'>{players[currentPlayerIndex].name}&apos;s turn:</Heading>
                    </VStack>
                    <NumbersQuestion question={currentQuestion} />
                    <AnswerInput 
                        answerState={answerState}
                        correctAnswer={currentQuestion.correctAnswer}
                        onSubmit={handleAnswerSubmit} 
                    />
                    <Center>
                    <Confetti 
                        active={answerState === AnswerState.correct} 
                        config={{
                            elementCount: 200,
                            spread: 200
                        }}
                    />
                    {answerState !== AnswerState.unanswered && <AnimatedIcon variant={answerState} />}
                    </Center>
                </Grid>
            }
            <Grid gap={2}>
                {answerState !== AnswerState.unanswered &&
                    <Button 
                        colorScheme='white' 
                        variant='outline' 
                        onClick={handleNextTurnButtonClick}
                        rightIcon={<ArrowForwardIcon />}
                    >
                        Start {players[getNextPlayerIndex()].name}&apos;s turn
                    </Button>
                }
            </Grid>
        </Grid>
    )
  }