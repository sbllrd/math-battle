import { QuestionStatus } from "@/types"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { Box, ScaleFade } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface AnimatedIconProps {
    variant: QuestionStatus
}

const AnimatedIcon = ({variant}: AnimatedIconProps) => { 
    const [active, setActive] = useState(true)

    const defaultProps = {
        h: 32,
        w: 32
    }

    const getIconVariant = () => {
        switch (variant) {
            case QuestionStatus.correct:
                return (
                    <CheckIcon {...defaultProps} color='green.500' />
                )
            case QuestionStatus.incorrect:
                return (
                    <CloseIcon {...defaultProps} color='red.500' />
                )
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          setActive(false);
        }, 500);
        return () => clearTimeout(timer);
      }, []);

    return (
        <Box position='absolute' left='calc(50% - 65px)' top='250px' opacity='.5'>
            <ScaleFade initialScale={0} in={active}>
                {getIconVariant()}
            </ScaleFade>
        </Box>
    )
}

export default AnimatedIcon