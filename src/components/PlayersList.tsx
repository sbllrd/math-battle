import { Player } from "@/types"
import { ArrowRightIcon } from "@chakra-ui/icons"
import { Box, Grid, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

interface PlayersListProps {
    currentPlayerIndex: number
    players: Player[]
}
const PlayersList = ({ currentPlayerIndex, players }: PlayersListProps) => {
    // return (
    //     <Grid
            // borderBottomColor='gray.700' 
            // borderBottomStyle='dotted'
            // borderBottomWidth='3px' 
            // borderTopColor='gray.700' 
            // borderTopStyle='dotted'
            // borderTopWidth='3px'
            // py={2} 
    //     >
    //         {players?.map(({id, name, score}, index) => (
    //             <Box key={id}>{currentPlayerIndex === index && <StarIcon />} {name} - {score}</Box>
    //         ))}
    //     </Grid>
    // )

    return (
        <TableContainer
            borderBottomColor='gray.700' 
            borderBottomStyle='dotted'
            borderBottomWidth='3px' 
            borderTopColor='gray.700' 
            borderTopStyle='dotted'
            borderTopWidth='3px'
            py={2}  
        >
            <Table size='sm' variant='unstyled'>
                <Thead color='gray.600'>
                <Tr>
                    <Th width='10px'></Th>
                    <Th>Name</Th>
                    <Th>Score</Th>
                </Tr>
                </Thead>
                <Tbody>
                {players?.map(({ id, name, score }, index) => (
                    <Tr key={id}>
                        <Td width='10px'>{index === currentPlayerIndex && <ArrowRightIcon />}</Td>
                        <Td>{name}</Td>
                        <Td fontWeight='bold'>{score}</Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default PlayersList