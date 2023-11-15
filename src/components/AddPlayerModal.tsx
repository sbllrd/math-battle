import { GameContext } from '@/app/game-provider'
import { Player } from '@/types'
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, UseModalProps } from '@chakra-ui/react'
import { useContext, useEffect, useRef, useState } from 'react'

type Props = UseModalProps

const AddPlayerModal = ({
    isOpen,
    onClose,
}: Props) => {
    const {updatePlayers } = useContext(GameContext)

    const [playerName, setPlayerName] = useState('')

    const handleAddPlayerButtonClick = () => {
        if (!playerName) return
        updatePlayers({playerName, action: 'add'})
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
                    {playerName && <Button onClick={handleAddPlayerButtonClick} width='full' variant='solid' colorScheme='cyan'>Add {playerName}</Button>}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddPlayerModal