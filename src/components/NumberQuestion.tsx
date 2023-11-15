import { Box, Center, Grid } from "@chakra-ui/react"
import OperationSymbol from "./OperationSymbol"
import { Question } from "@/types"
import { useState } from "react"

interface NumberQuestionProps {
    question: Question
}

const NumberQuestion = ({ question }: NumberQuestionProps) => {
    return (
        <Center>
            <Grid gap={0}>
                {question?.numbers?.map((number, index) => (
                    <Grid 
                        key={index} 
                        position='relative' 
                        alignItems='center' 
                        justifyContent='end'
                    >
                        {index === question.numbers.length - 1  && 
                            <Box 
                                display='inline'
                                position='absolute'
                                left='-36px'
                            >
                                <OperationSymbol operation={question.operation} />
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

export default NumberQuestion