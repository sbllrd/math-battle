import { Player } from '@/types'
import { StarIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, UseModalProps } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

interface AddPlayerModalProps {
    addNewPlayer: (name: string) => void
}

type Props = AddPlayerModalProps & UseModalProps

const AddPlayerModal = ({
    addNewPlayer,
    isOpen,
    onClose,
}: Props) => {
    const [playerName, setPlayerName] = useState('')
    const handleAddPlayerButtonClick = () => {
        if (!playerName) return
        addNewPlayer(playerName)
        onClose()
    }
    useEffect(() => {
        setPlayerName('')
    }, [isOpen])

    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter'){
            handleAddPlayerButtonClick()
        }
    }
    const initialRef = useRef(null)
    return (
        <Modal 
            initialFocusRef={initialRef}
            isOpen={isOpen} 
            onClose={onClose} 
            closeOnOverlayClick={false} 
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent bg='gray.800' mx={4}>
                <ModalHeader>Add Player</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize='small' fontWeight='bold' mb={2}>Player Name</Text>
                    <Input ref={initialRef} value={playerName} onChange={(e) => setPlayerName(e.currentTarget.value)} onKeyDown={handleKeyPress} />
                </ModalBody>
                <ModalFooter justifyContent='center'>
                    <Button onClick={handleAddPlayerButtonClick} variant='solid' colorScheme='cyan'>Add Player</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddPlayerModal