import { Player } from "@/types"
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons"
import {  Button, Grid, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

interface PlayersListProps {
    currentPlayerIndex: number
    handleAddPlayerButtonClick: () => void
    players: Player[]
    allowAddNewPlayer: boolean
}
const PlayersList = ({ allowAddNewPlayer, currentPlayerIndex, handleAddPlayerButtonClick, players }: PlayersListProps) => {
    return (
        <Grid
            borderTopColor='gray.700' 
            borderTopStyle='dotted'
            borderTopWidth='3px'
            py={3}
            gap={3}
        >
            {players.length > 0 &&
                <>
                    {allowAddNewPlayer && <Heading size='xs'>PLAYERS</Heading>}
                    <TableContainer>
                        <Table size='xs' fontSize='small' variant='unstyled'>
                            <Thead color='gray.600' fontSize='xs'>
                            <Tr>
                                <Th width='10px'></Th>
                                <Th>Name</Th>
                                <Th>Score</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {players?.map(({ id, name, score }, index) => (
                                <Tr key={id}>
                                    <Td width='10px'>{index === currentPlayerIndex && <ChevronRightIcon w={4} h={4} />}</Td>
                                    <Td>{name}</Td>
                                    <Td fontWeight='bold'>{score}</Td>
                                </Tr>
                            ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            }
            {allowAddNewPlayer && 
                <Button 
                    colorScheme='cyan'
                    variant='solid'
                    size='md'
                    onClick={handleAddPlayerButtonClick}
                    leftIcon={<AddIcon />}
                >
                    Add New Player
                </Button>
            }
        </Grid>
    )
}

export default PlayersList