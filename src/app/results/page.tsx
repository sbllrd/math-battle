'use client'

import { Button } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

function ResultsPage() {
    const router = useRouter()
    return (
        <Button 
            colorScheme='cyan'
            size='lg'
            variant='solid' 
            onClick={() => router.push('/')}
        >
            New Game
        </Button>
    )
}

export default ResultsPage