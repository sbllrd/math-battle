import { Question, QuestionStatus } from "@/types"
import generateNumberMultipleChoiceOptions from "@/utils/generate_number_multiple_choice_options"
import { Box, Button, Grid, SimpleGrid } from "@chakra-ui/react"
import { useMemo, useState } from "react"

interface Props {
    questionStatus: QuestionStatus
    correctAnswer: Question['correctAnswer']
    submitAnswer: (answer: number) => void
    numberOfOptions?: number
}

const NumberMultipleChoiceAnswer = ({
    questionStatus,
    correctAnswer,
    submitAnswer,
    numberOfOptions = 4
}: Props) => {
    const [selectedOption, setSelectedOption] = useState<number>()
    const numberOptions = useMemo(() => generateNumberMultipleChoiceOptions(correctAnswer, numberOfOptions), [correctAnswer])

    const handleSubmitAnswer = (answer: number) => {
        if ( questionStatus === QuestionStatus.inProgress) {
            setSelectedOption(answer)
            submitAnswer(answer)
        }
    }

    const getBgColor =  useMemo(() => (option: number) => {
        if (questionStatus === QuestionStatus.incorrect) {
            if (option === correctAnswer) return 'green.400'
            if (option === selectedOption) return 'red.500'
        }
        if (questionStatus === QuestionStatus.correct) {
            if (option === correctAnswer) return 'green.400'
        }
        return 'white'
    }, [correctAnswer, questionStatus, selectedOption])

    return (
        <SimpleGrid columns={2} gap={3} mt={2}>
            {numberOptions.map((option) => (
                <Button 
                    onClick={() => handleSubmitAnswer(option)}
                    key={option} 
                    variant='unstyled'
                    color='gray.900'
                    size='lg'
                    fontSize='x-large'
                    fontWeight='bold'
                    bg={getBgColor(option)}
                    disabled={questionStatus !== QuestionStatus.inProgress}
                >
                    {option}
                </Button>
            ))}
        </SimpleGrid>
    )
}

export default NumberMultipleChoiceAnswer


// fontSize='5xl'
// fontWeight='bold'
// inputMode='numeric'
// onChange={handleOnChange}
// onKeyDown={handleKeyPress}
// paddingTop={2}
// pattern='[0-9]*'
// py={1}
// readOnly={questionStatus !== QuestionStatus.inProgress}
// ref={inputRef}
// size='lg'
// textAlign='center'
// textDecoration={questionStatus === QuestionStatus.incorrect ? 'line-through solid 4px' : 'unset'}
// textDecorationColor='whiteAlpha.00'
// type='text'
// value={inputValue}
// variant='unstyled'