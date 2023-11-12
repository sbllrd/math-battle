'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './theme'
import GameProvider from './game-provider'

export function GlobalProviders({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <GameProvider>
          {children}
        </GameProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}