import { Box, Center, Grid } from "@chakra-ui/react"
import OperationSymbol from "./OperationSymbol"
import { Question } from "@/types"

interface NumbersQuestionProps {
    question: Question
}

const NumbersQuestion = ({ question }: NumbersQuestionProps) => {
    return (
        <Center>
            <Grid gap={0}>
                {question?.numbers?.map((number, index) => (
                    <Grid key={index} position='relative' alignItems='center' justifyContent='center'>
                        {index != 0 && 
                            <Box 
                                display='inline'
                                position='absolute'
                                left='-36px'
                            >
                                <OperationSymbol />
                            </Box>
                        }
                        <Box 
                            display='inline'
                            fontSize='5xl'
                            fontWeight='bold'
                            color='white'
                            lineHeight='100%'
                        >
                            {number}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Center>
    )
}

export default NumbersQuestion