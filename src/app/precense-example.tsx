'use client'

import { Heading } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';
import { GameContext } from './game-provider';
import { RealtimePresenceState } from '@supabase/supabase-js'
import supabase from '@/utils/supabase'

export default function RootPage({
    children,
  }: {
    children: React.ReactNode
  }) {
    const { currentPlayer } = useContext(GameContext);

    const [userState, setUserState] = useState<RealtimePresenceState>({})

    useEffect(() => {
      console.log('user: ', currentPlayer)
  
      const gameSessionChanel = supabase.channel('game-session',{
        config: {
            // presence: {
            //   key: currentPlayer?.name ?? 'Unknown',
            // },
          },
      })
  
      gameSessionChanel.on('presence', { event: 'sync' }, () => {
        const presentState = gameSessionChanel.presenceState()
  
        console.log('inside presence: ', presentState)
  
        setUserState({ ...presentState })
      })
  
      gameSessionChanel.on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('New users have joined: ', newPresences)
      })
  
      gameSessionChanel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const status = await gameSessionChanel.track({
            playerName: currentPlayer?.name ??  'Unknown',
          })
          console.log('status: ', status)
        }
      })
    }, [])
    
    useEffect(() => {
        console.log('userState', userState)
    }, [userState])

    return (
        <>
            {Object.keys(userState).map((key) => (
                <p key={key}>Hi {key}</p>
            ))}
        </>
    )
  }