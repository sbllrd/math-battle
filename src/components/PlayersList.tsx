import { GameStatus } from "@/types"
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons"
import {  Button, Grid, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import AddPlayerModal from "./AddPlayerModal"
import { useContext } from "react"
import { GameContext } from "@/app/game-provider"

const PlayersList = () => {
    const { isOpen: isAddPlayerModalOpen, onOpen: openAddPlayerModal, onClose: closeAddPlayerModal } = useDisclosure()
    const { 
        currentPlayerTurn, 
        getPlayerScore,
        players,
        gameStatus
    } = useContext(GameContext)

    const currentPlayer = currentPlayerTurn?.player
    const isNewGame = gameStatus === GameStatus.newGame

    return (
        <Grid
            gap={3} 
            py={4}
            my={4}
            borderBottomColor='gray.700'
            borderBottomStyle='dotted'
            borderBottomWidth='3px'
        >
            {players.length > 0 &&
                <>
                    {isNewGame && <Heading size='xs'>PLAYERS</Heading>}
                    <TableContainer>
                        <Table size='xs' fontSize='small' variant='unstyled'>
                            <Thead color='gray.600' fontSize='xs'>
                            <Tr>
                                <Th width='10px'></Th>
                                <Th>Name</Th>
                                {!isNewGame && <Th>Score</Th>}
                            </Tr>
                            </Thead>
                            <Tbody>
                            {players?.map(({ id, name }, index) => (
                                <Tr key={id}>
                                    <Td width='10px'>{id === currentPlayer?.id && <ChevronRightIcon w={4} h={4} />}</Td>
                                    <Td>{name}</Td>
                                    {!isNewGame && <Td fontWeight='bold'>{getPlayerScore(id)}</Td>}
                                </Tr>
                            ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </>
            }
            {isNewGame && 
                <Button 
                    colorScheme='cyan'
                    variant='solid'
                    size='md'
                    onClick={openAddPlayerModal}
                    leftIcon={<AddIcon />}
                >
                    Add New Player
                </Button>
            }
            <AddPlayerModal
                isOpen={isAddPlayerModalOpen}
                onClose={closeAddPlayerModal}
            />
        </Grid>
    )
}

export default PlayersList