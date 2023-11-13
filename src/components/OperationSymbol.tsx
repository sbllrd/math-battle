import { Operation } from "@/types"
import { AddIcon, MinusIcon } from "@chakra-ui/icons"

interface OperationSymbolProps {
    operation: Operation
}

const OperationSymbol = ({operation}: OperationSymbolProps) => {
    const defaultProps = {
        w: 6,
        h: 6
    }

    switch (operation) {
        case Operation.addition:
            return (
                <AddIcon {...defaultProps} />
            )
        case Operation.subtraction:
            return (
                <MinusIcon {...defaultProps} />
            )
        default:
            return <></>
    }

}

export default OperationSymbol