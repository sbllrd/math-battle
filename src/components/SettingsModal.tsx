import { Box, Button, Checkbox, CheckboxGroup, Grid, GridItem, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, UseModalProps, VStack } from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { AnswerFormat, GameSettings, Operation } from '@/types'
import { useContext } from 'react'
import { GameContext } from '@/app/game-provider'

interface SettingsModalProps {
    settings: GameSettings
}

type Props = SettingsModalProps & UseModalProps

const SettingsModal = ({
    settings,
    isOpen,
    onClose,
}: Props) => {
    const { updateGameSettings } = useContext(GameContext)
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
                                onChange={(event) => updateGameSettings('answer_format', event.target.value)}
                            >
                                {Object.entries(AnswerFormat).map(([key, answerFormat]) => (
                                    <option key={key} value={answerFormat}>{answerFormat}</option>
                                ))}
                            </Select>
                        </GridItem>
                        {settings.answer_format === AnswerFormat.multiple_choice &&
                            <GridItem>
                                <Text fontSize='small' fontWeight='bold' mb={2}>Number of multiple choice options</Text>
                                <NumberInput 
                                    value={settings.number_of_options}
                                    onChange={(value) => updateGameSettings('number_of_options', value)} 
                                >
                                    <NumberInputField />
                                    <NumberInputStepper bg='white'>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </GridItem>
                        }
                        <GridItem>
                            <Text fontSize='small' fontWeight='bold' mb={2}>Possible numbers range</Text>
                            <HStack spacing={2}>
                                <Box>
                                    <NumberInput 
                                        value={settings.min_number}
                                        onChange={(value) => updateGameSettings('min_number', value)} 
                                    >
                                        <NumberInputField />
                                    </NumberInput>
                                </Box>
                                <Box><MinusIcon /></Box>
                                <Box>
                                    <NumberInput 
                                        value={settings.max_number}
                                        onChange={(value) => updateGameSettings('max_number', value)} 
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
                                onChange={(value) => updateGameSettings('number_count', value)} 
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
                                onChange={(value) => updateGameSettings('rounds_count', value)} 
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
                                onChange={(value) => updateGameSettings('operations', value)}
                            >
                                <VStack spacing={2} align='flex-start'>
                                    {Object.entries(Operation).map(([_, operation]) => (
                                        <Checkbox key={operation} value={operation}>{operation}</Checkbox>
                                    ))}
                                </VStack>
                            </CheckboxGroup>
                        </GridItem>
                        {settings.operations.includes(Operation.subtraction) &&
                            <GridItem>
                                <Text fontSize='small' fontWeight='bold' mb={2}>Allow negative answers (subtraction only)</Text>
                                    <VStack spacing={2} align='flex-start'>
                                        <Checkbox 
                                            colorScheme='cyan'
                                            defaultChecked={settings.allow_negatives}
                                            onChange={((event) => updateGameSettings('allow_negatives', event.target.checked))}
                                        >
                                            Allow negatives
                                        </Checkbox>
                                    </VStack>
                            </GridItem>
                        }

                    </Grid>
                </ModalBody>
                <ModalFooter justifyContent='center'>
                    <Button width='full' onClick={onClose}>Save & Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SettingsModal