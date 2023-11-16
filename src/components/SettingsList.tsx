import formatSnakeCaseToString from "@/utils/format_snake_case_to_string"
import { Button, Grid, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react"
import SettingsModal from "./SettingsModal"
import { useContext } from "react"
import { GameContext } from "@/app/game-provider"
import { SettingsIcon } from "@chakra-ui/icons"

const SettingsList = () => {
    const { isOpen: isSettingsModalOpen, onOpen: openSettingsModal, onClose: closeSettingsModal } = useDisclosure()
    const { gameSettings, updateGameSettings } = useContext(GameContext)
    return (
        <Grid 
            gap={3}
            py={4}
            my={4}
        >
            <Heading size='xs'>SETTINGS</Heading>
            <TableContainer>
                <Table size='xs' fontSize='small' variant='unstyled'>
                    <Thead color='gray.600' fontSize='xs'>
                    <Tr>
                        <Th></Th>
                        <Th></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {Object.entries(gameSettings).map(([key, value]) => (
                        <Tr key={key}>
                            <Td pr={2} py={1} verticalAlign='top' >{formatSnakeCaseToString(key)}</Td>
                            <Td whiteSpace='initial' fontWeight='bold'>{typeof value == 'object' ? value.join(', ') : String(value)}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Button
                colorScheme='cyan'
                variant='outline'
                size='sm'
                onClick={openSettingsModal}
                leftIcon={<SettingsIcon />}
            >
                Change Settings
            </Button>
            <SettingsModal
                settings={gameSettings}
                isOpen={isSettingsModalOpen}
                onClose={closeSettingsModal}
            />
        </Grid>
    )
}

export default SettingsList