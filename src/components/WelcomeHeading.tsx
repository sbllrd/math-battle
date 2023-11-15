import { Heading, Text, VStack } from "@chakra-ui/react"

interface Props {
    heading: string
}

const WelcomeHeading = ({
    heading
}: Props) => {
    return (
        <VStack
            spacing={0} 
            py={4}
            my={4}
            borderBottomColor='gray.700'
            borderBottomStyle='dotted'
            borderBottomWidth='3px'
        >
            <Heading fontSize='x-large'>{heading}</Heading>
        </VStack>
    )
}

export default WelcomeHeading
