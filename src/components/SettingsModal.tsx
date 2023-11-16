import { Box, Button, Checkbox, CheckboxGroup, Grid, GridItem, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, UseModalProps, VStack } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { AnswerFormat, GameSettings, Operation } from '@/types'

interface SettingsModalProps {
    handleSettingsUpdate: (settingsName: string, value: any) => void
    settings: GameSettings
}

type Props = SettingsModalProps & UseModalProps

const SettingsModal = ({
    handleSettingsUpdate,
    settings,
    isOpen,
    onClose,
}: Props) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            closeOnOverlayClick={false} 
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent bg='gray.800' mx={4}>
                <ModalHeader>Game Settings</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Grid gap={6}>
                        <GridItem>
                            <Text fontSize='small' fontWeight='bold' mb={2}>Answer format</Text>
                            <Select 
                                defaultValue={settings.answer_format} 
                                onChange={(event) => handleSettingsUpdate('answer_format', event.target.value)}
                            >
                                {Object.entries(AnswerFormat).map(([key, answerFormat]) => (
                                    <option key={key} value={answerFormat}>{answerFormat}</option>
                                ))}
                            </Select>
                        </GridItem>
                        <GridItem>
                            <Text fontSize='small' fontWeight='bold' mb={2}>Possible numbers range</Text>
                            <HStack spacing={2}>
                                <Box>
                                    <NumberInput 
                                        value={settings.min_number}
                                        onChange={(value) => handleSettingsUpdate('min_number', value)} 
                                    >
                                        <NumberInputField />
                                    </NumberInput>
                                </Box>
                                <Box><MinusIcon /></Box>
                                <Box>
                                    <NumberInput 
                                        value={settings.max_number}
                                        onChange={(value) => handleSettingsUpdate('max_number', value)} 
                                    >
                                        <NumberInputField />
                                    </NumberInput>
                                </Box>
                            </HStack>
                        </GridItem>
                        <GridItem>
                            <Text fontSize='small' fontWeight='bold' mb={2}>How many numbers</Text>
                            <NumberInput 
                                value={settings.number_count}
                                onChange={(value) => handleSettingsUpdate('number_count', value)} 
                            >
                                <NumberInputField />
                                <NumberInputStepper bg='white'>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </GridItem>
                        <GridItem>
                            <Text fontSize='small' fontWeight='bold' mb={2}>Number of rounds</Text>
                            <NumberInput 
                                value={settings.rounds_count}
                                onChange={(value) => handleSettingsUpdate('rounds_count', value)} 
                            >
                                <NumberInputField />
                                <NumberInputStepper bg='white'>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </GridItem>
                        <GridItem>
                            <Text fontSize='small' fontWeight='bold' mb={2}>Operations</Text>
                            <CheckboxGroup 
                                colorScheme='cyan' 
                                defaultValue={settings.operations}
                                onChange={(value) => handleSettingsUpdate('operations', value)}
                            >
                                <VStack spacing={2} align='flex-start'>
                                    <Checkbox value={Operation.addition}>Addition (<AddIcon h={3} />)</Checkbox>
                                    <Checkbox value={Operation.subtraction}>Subtraction (<MinusIcon h={3} />)</Checkbox>
                                </VStack>
                            </CheckboxGroup>
                        </GridItem>
                    </Grid>
                    {/* {
                            operations: [Operation.addition],
                    } */}
                </ModalBody>
                <ModalFooter justifyContent='center'>
                    <Button width='full' onClick={onClose}>Save & Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SettingsModal