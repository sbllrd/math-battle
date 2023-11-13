import { AnswerState, Question } from "@/types"
import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons"
import { Button, Grid, Input, InputGroup, InputRightAddon } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

const answerStateStyles = {
    [AnswerState.correct]: {
        color: 'green.400'
    },
    [AnswerState.incorrect]: {
        color: 'red.500'
    },
    [AnswerState.unanswered]: {
        color: 'white'
    },
    [AnswerState.newGame]: {
        color: 'white'
    }
}

interface AnswerInputProps {
    answerState: AnswerState
    correctAnswer: Question['correctAnswer']
    onSubmit: (answer: number) => void
}

const NumberAnswerInput = ({ answerState, correctAnswer, onSubmit }: AnswerInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const maxLength = Math.max(4, correctAnswer.toString().length)
    
    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter'){
            handleSubmitAnswer()
        }
    }

    const handleSubmitAnswer = () => {
        if ( answerState === AnswerState.unanswered && inputValue) {
            onSubmit(Number(inputValue))
        }
    }

    const handleOnChange = (event: any) => {
        const newValue = event.currentTarget.value
        newValue.length <= maxLength && setInputValue(newValue.replace(/\D/g, ''))
    }

    useEffect(() => {
        if (answerState === AnswerState.unanswered) {
            setInputValue('')
            inputRef.current?.focus()
        }
    }, [answerState])

    return (
        <Grid>
            <InputGroup>
                <Input
                    onKeyDown={handleKeyPress}
                    onChange={handleOnChange}
                    value={inputValue}
                    pattern='[0-9]*'
                    type='text'
                    inputMode='numeric'
                    ref={inputRef}
                    readOnly={answerState !== AnswerState.unanswered}
                    
                    autoFocus
                    bg='gray.800'
                    borderRadius='0'
                    borderTopColor='cyan.100'
                    borderTopWidth='3px'
                    color={answerStateStyles[answerState].color}
                    fontSize='5xl'
                    fontWeight='bold'
                    paddingTop={2}
                    size='lg'
                    textAlign='center'
                    variant='unstyled'
                    maxW='200px'
                />
                {answerState === AnswerState.incorrect &&
                    <InputRightAddon
                        marginTop='40px'
                        bg='gray.800'
                        border='none'
                        color='green.500'
                        fontWeight='bold'
                        position='absolute'
                        width='80px'
                        right='-80px'
                    >
                        <CheckIcon w={2} h={2  } mr={1} />
                        {correctAnswer}
                    </InputRightAddon>
                }
            </InputGroup>
            {answerState === AnswerState.unanswered && inputValue &&
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