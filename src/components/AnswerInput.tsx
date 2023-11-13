import { GameStatus, Question } from "@/types"
import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons"
import { Button, Grid, Input, InputGroup, InputRightAddon } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

const gameStatusStyles = {
    [GameStatus.correct]: {
        color: 'green.400'
    },
    [GameStatus.incorrect]: {
        color: 'red.500'
    },
    [GameStatus.unanswered]: {
        color: 'white'
    },
    [GameStatus.newGame]: {
        color: 'white'
    }
}

interface AnswerInputProps {
    gameStatus: GameStatus
    correctAnswer: Question['correctAnswer']
    onSubmit: (answer: number) => void
}

const NumberAnswerInput = ({ gameStatus, correctAnswer, onSubmit }: AnswerInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const maxLength = Math.max(4, correctAnswer.toString().length)
    
    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter'){
            handleSubmitAnswer()
        }
    }

    const handleSubmitAnswer = () => {
        if ( gameStatus === GameStatus.unanswered && inputValue) {
            onSubmit(Number(inputValue))
        }
    }

    const handleOnChange = (event: any) => {
        const newValue = event.currentTarget.value
        newValue.length <= maxLength && setInputValue(newValue.replace(/\D/g, ''))
    }

    useEffect(() => {
        if (gameStatus === GameStatus.unanswered) {
            setInputValue('')
            inputRef.current?.focus()
        }
    }, [gameStatus])

    return (
        <Grid>
            <InputGroup justifyContent='center'>
                <Input
                    autoFocus
                    bg={gameStatus !== GameStatus.unanswered ? 'transparent' : 'gray.800'}
                    borderRadius='0'
                    borderTopColor='cyan.100'
                    borderTopWidth='3px'
                    color={gameStatusStyles[gameStatus].color}
                    fontSize='5xl'
                    fontWeight='bold'
                    inputMode='numeric'
                    maxW='200px'
                    onChange={handleOnChange}
                    onKeyDown={handleKeyPress}
                    paddingTop={2}
                    pattern='[0-9]*'
                    readOnly={gameStatus !== GameStatus.unanswered}
                    ref={inputRef}
                    size='lg'
                    textAlign='center'
                    textDecoration={gameStatus === GameStatus.incorrect ? 'line-through solid 4px' : 'unset'}
                    textDecorationColor='whiteAlpha.00'
                    type='text'
                    value={inputValue}
                    variant='unstyled'
                />
                {gameStatus === GameStatus.incorrect &&
                    <InputRightAddon
                        bg='transparent'
                        border='none'
                        color='green.500'
                        fontWeight='bold'
                        position='absolute'
                        bottom='-26px'
                        fontSize='xx-large'
                    >
                        {correctAnswer}
                    </InputRightAddon>
                }
            </InputGroup>
            {gameStatus === GameStatus.unanswered && inputValue &&
                <Button
                    leftIcon={<CheckCircleIcon w={6} h={6} color='cyan.500' />}
                    onClick={handleSubmitAnswer} 
                    aria-label='Submit answer'
                    size='lg'
                >
                    SUBMIT
                </Button>
            }
        </Grid>
    )
}

export default NumberAnswerInput