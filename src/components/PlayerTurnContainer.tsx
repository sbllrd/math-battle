import { useContext, useEffect } from "react"
import { AnswerFormat, GameStatus, QuestionStatus } from "@/types"

import { Box, Button, Center, Flex, Grid, Heading, Text, VStack, useDisclosure } from "@chakra-ui/react"
import { ArrowForwardIcon, TimeIcon } from "@chakra-ui/icons"

import { useStopwatch } from "react-timer-hook"
import { useReward } from "react-rewards"

// @ts-ignore
import useSound from 'use-sound'

import { GameContext } from "@/app/game-provider"

import AnimatedIcon from "./AnimatedIcon"
import NumberAnswerInput from "./NumberAnswerInput"
import NumberQuestion from "./NumberQuestion"
import ResultsModal from "./ResultsModal"
import NumberMultipleChoiceAnswer from "./NumberMultipleChoiceAnswer"



const PlayerTurnContainer = () => {
    const { isOpen: isResultsModalOpen, onOpen: openResultsModal, onClose: closeResultsModal } = useDisclosure()

    const { 
        currentPlayerTurn,
        nextTurnPlayersName,
        submitAnswer, 
        startNextTurn, 
        gameSettings,
        gameStatus,
        finishGame
    } = useContext(GameContext)

    if (!currentPlayerTurn) throw Error('Player turn not found!')

    const { 
        player,
        question,
        roundNumber,
        questionStatus,
    } = currentPlayerTurn

    const {
        totalSeconds: questionTimerTotalSeconds,
        isRunning: isQuestionTimerRunning,
        start: startQuestionTimer,
        pause: pauseQuestionTimer,
        reset: resetQuestionTimer,
    } = useStopwatch();


    const { reward: answerReward } = useReward('answerReward', 'confetti', {
        elementCount: 200,
        lifetime: 100
    });

    const [playCorrectSound] = useSound('/sounds/correct.mp3')
    const [playIncorrectSound] = useSound('/sounds/incorrect.mp3')

    const handleSubmitAnswer = (answer: number) => {
        submitAnswer(answer, questionTimerTotalSeconds)
    }

    useEffect(() => {
        // Handle sounds and animations when answer is submitted.
        if (questionStatus === QuestionStatus.correct) {
            answerReward()
            playCorrectSound()
        } else if (questionStatus === QuestionStatus.incorrect) {
            playIncorrectSound()
        }
    }, [questionStatus])

    useEffect(() => {
        if (gameStatus === GameStatus.finished) {
            openResultsModal()
        }
    }, [gameStatus])

    useEffect(() => {
        if (questionStatus === QuestionStatus.inProgress) {
            resetQuestionTimer(undefined, true)
        } else {
            pauseQuestionTimer()
        }
    }, [questionStatus, gameStatus])

    return (
        <Grid
            gap={4}
            pt={6}
        >
            {questionStatus !== QuestionStatus.inProgress && <AnimatedIcon variant={questionStatus} />}
            <VStack spacing={0}>
                <Text fontSize='sm'>Round <b>{roundNumber}</b> of {gameSettings.rounds_count}</Text>
                <Heading textAlign='center' fontSize='x-large'>{player.name}&apos;s turn:</Heading>
            </VStack>
            <NumberQuestion question={question} />
            
            {gameSettings.answer_format === AnswerFormat.number_input &&
                <NumberAnswerInput 
                    questionStatus={questionStatus}
                    correctAnswer={question.correctAnswer}
                    submitAnswer={handleSubmitAnswer}
                />
            }
            {gameSettings.answer_format === AnswerFormat.multiple_choice &&
                <NumberMultipleChoiceAnswer
                    questionStatus={questionStatus}
                    correctAnswer={question.correctAnswer}
                    submitAnswer={handleSubmitAnswer}
                    numberOfOptions={gameSettings.number_of_options}
                />
            }
            {gameSettings.show_answers && <Box textAlign='center' fontSize='larger'>Answer: <b>{currentPlayerTurn.question.correctAnswer}</b></Box>}
            <Flex justifyContent='center'>
                <Box id="answerReward" />
            </Flex>
            {isQuestionTimerRunning && (
                <Center alignItems='center' gap={2}>
                    <TimeIcon w={4} h={4} /> <>{questionTimerTotalSeconds}s</>
                </Center>
            )}
            {questionStatus !== QuestionStatus.inProgress &&
                <>
                    {gameStatus === GameStatus.inProgress &&
                        <Button
                            colorScheme='cyan'
                            size='lg'
                            variant='solid'
                            width='full'
                            onClick={startNextTurn}
                            rightIcon={<ArrowForwardIcon />}
                        >
                            <>Start {nextTurnPlayersName} Turn</>
                        </Button>
                    }
                    {gameStatus === GameStatus.lastTurn &&
                        <Button
                            colorScheme='orange'
                            size='lg'
                            variant='solid' 
                            width='full'
                            onClick={finishGame}
                        >
                            <>Finish Battle</>
                        </Button>    
                    }
                </>
            }
            <ResultsModal
                isOpen={isResultsModalOpen}
                onClose={closeResultsModal}
            />
        </Grid>
    )
}

export default PlayerTurnContainer