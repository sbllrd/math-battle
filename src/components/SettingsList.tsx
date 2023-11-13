import { GameSettings } from "@/types"
import formatSnakeCaseToString from "@/utils/format_snake_case_to_string"
import { ArrowRightIcon, SettingsIcon } from "@chakra-ui/icons"
import { Button, Grid, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

interface SettingsListProps {
    handleSettingsButtonClick: () => void
    settings: GameSettings
}
const SettingsList = ({ handleSettingsButtonClick, settings }: SettingsListProps) => {
    return (
        <Grid
            borderBottomColor='gray.700' 
            borderBottomStyle='dotted'
            borderBottomWidth='3px' 
            borderTopColor='gray.700' 
            borderTopStyle='dotted'
            borderTopWidth='3px'
            py={2}  
            gap={3}
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
                    {Object.entries(settings).map(([key, value]) => (
                        <Tr key={key}>
                            <Td>{formatSnakeCaseToString(key)}</Td>
                            <Td fontWeight='bold'>{typeof value == 'object' ? value.join(', ') : value}</Td>
                        </Tr>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Button
                colorScheme='cyan'
                variant='outline'
                size='sm'
                onClick={handleSettingsButtonClick}
                leftIcon={<SettingsIcon />}
            >
                Change Settings
            </Button>
        </Grid>
    )
}

export default SettingsList