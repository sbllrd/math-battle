import { Question, QuestionStatus } from "@/types"
import { CheckCircleIcon } from "@chakra-ui/icons"
import { Button, Grid, Input, InputGroup, InputRightAddon } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

const questionStatusStyles = {
    [QuestionStatus.correct]: {
        color: 'green.400'
    },
    [QuestionStatus.incorrect]: {
        color: 'red.500'
    },
    [QuestionStatus.inProgress]: {
        color: 'white'
    }
}

interface AnswerInputProps {
    questionStatus: QuestionStatus
    correctAnswer: Question['correctAnswer']
    submitAnswer: (answer: number) => void
}

const NumberAnswerInput = ({ questionStatus, correctAnswer, submitAnswer }: AnswerInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const maxLength = Math.max(4, correctAnswer.toString().length + 1)
    
    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter'){
            handleSubmitAnswer()
        }
    }

    const validateInputValue = () => {
        return !!inputValue && inputValue !== '-'
    }

    const handleSubmitAnswer = () => {
        if ( questionStatus === QuestionStatus.inProgress && validateInputValue() ) {
            submitAnswer(Number(inputValue))
        }
    }

    const handleOnChange = (event: any) => {
        const newValue = event.currentTarget.value
        newValue.length <= maxLength && setInputValue(newValue.replace(/^-[^\d]/g, ''))
    }

    useEffect(() => {
        if (questionStatus === QuestionStatus.inProgress) {
            setInputValue('')
            inputRef.current?.focus()
        }
    }, [questionStatus])

    return (
        <Grid gap={4}>
            <InputGroup justifyContent='center'>
                <Input
                    autoFocus
                    bg={questionStatus !== QuestionStatus.inProgress ? 'transparent' : 'gray.800'}
                    borderRadius='0'
                    borderTopColor='cyan.100'
                    borderTopWidth='3px'
                    color={questionStatusStyles[questionStatus].color}
                    fontSize='5xl'
                    fontWeight='bold'
                    inputMode='numeric'
                    onChange={handleOnChange}
                    onKeyDown={handleKeyPress}
                    paddingTop={2}
                    pattern='[0-9]*'
                    py={1}
                    readOnly={questionStatus !== QuestionStatus.inProgress}
                    ref={inputRef}
                    size='lg'
                    textAlign='center'
                    textDecoration={questionStatus === QuestionStatus.incorrect ? 'line-through solid 4px' : 'unset'}
                    textDecorationColor='whiteAlpha.00'
                    type='text'
                    value={inputValue}
                    variant='unstyled'
                />
                {questionStatus === QuestionStatus.incorrect &&
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
            {questionStatus === QuestionStatus.inProgress && inputValue &&
                <Button
                    leftIcon={<CheckCircleIcon w={6} h={6} color='orange.300' />}
                    onClick={handleSubmitAnswer} 
                    aria-label='Submit answer'
                    size='lg'
                >
                    Submit
                </Button>
            }
        </Grid>
    )
}

export default NumberAnswerInput