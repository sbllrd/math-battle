'use client'

import { DEFAULT_GAME_SETTINGS, TEST_GAME_SETTINGS, TEST_PLAYERS } from '@/constants'
import { GameSettings, GameStatus, Player, PlayerTurn, QuestionStatus } from '@/types'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { generatePlayerTurns } from '@/utils/generate_player_turns'
import { calculateScore } from '@/utils/calculate_score'

interface GameProviderProps {
    children: ReactNode
}

interface GameContext {
    // Game State
    currentPlayerTurn: PlayerTurn | undefined
    gameSettings: GameSettings
    gameStatus: GameStatus
    nextTurnPlayersName: Player['name'] | undefined
    players: Player[]
    playerTurns: PlayerTurn[] | undefined

    // Game Methods
    finishGame: () => void
    getPlayerScore: (playerId: Player['id']) => number
    resetGame: () => void
    startGame: () => Promise<void>
    startNextTurn: () => void
    submitAnswer: (answer: number, elapsedTime: number) => void
    updateGameSettings: (settingsName: string, value: any) => void
    updatePlayers: ({ playerName, action }: {
        playerName: Player['name'];
        action: 'add' | 'delete';
    }) => void
    updatePlayerTurn: (updatedPlayerTurn: Partial<PlayerTurn>) => void
}

const DEFAULT_GAME_CONTEXT: GameContext = {
    // Game State
    currentPlayerTurn: undefined,
    gameSettings: DEFAULT_GAME_SETTINGS,
    gameStatus: GameStatus.newGame,
    nextTurnPlayersName: undefined,
    players: [],
    playerTurns: undefined,

    // Game Methods
    finishGame: () => {},
    getPlayerScore: () => 0,
    resetGame: () => {},
    startGame: async () => {},
    startNextTurn: () => {},
    submitAnswer: () => {},
    updateGameSettings: () => {},
    updatePlayers: () => {},
    updatePlayerTurn: () => {},
}

const GameContext = createContext<GameContext>(DEFAULT_GAME_CONTEXT)

function GameProvider({ children }: GameProviderProps) {
    const searchParams = useSearchParams()
    const isTest = searchParams.get('test') === 'true'

    const [currentPlayerTurn, setCurrentPlayerTurn] = useState<PlayerTurn>()
    const [currentTurnIndex, setCurentTurnIndex] = useState<number>()
    const [gameSettings, setGameSettings] = useState<GameSettings>(isTest ? TEST_GAME_SETTINGS : DEFAULT_GAME_SETTINGS)
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.newGame)
    const [nextTurnPlayersName, setNextTurnPlayersName] = useState<Player['name']>()
    const [players, setPlayers] = useState<Player[]>(isTest ? TEST_PLAYERS : [])
    const [playerTurns, setPlayerTurns] = useState<PlayerTurn[]>()

    const finishGame = () => {
        setGameStatus(GameStatus.finished)
    }

    const getPlayerScore = (playerId: Player['id']): number => {
        if (!playerTurns) return 0
        const playerScore = playerTurns.reduce((totalScore, playerTurn) => { 
            return playerTurn.player.id === playerId ? totalScore + playerTurn.score : totalScore 
        }, 0);
        return playerScore
    }

    const resetGame = () => {
        setGameStatus(GameStatus.newGame)
        setPlayerTurns([])
        setCurentTurnIndex(undefined)
        setCurrentPlayerTurn(undefined)
        setNextTurnPlayersName(undefined)
    }

    const startGame = async () => {
        await generatePlayerTurns({ gameSettings, players })
            .then((playerTurns) => {
                const numberOfTurns = playerTurns.length
                if (numberOfTurns < 1) {
                    throw Error('Unable to start new game.')
                }
                setPlayerTurns(playerTurns)
                setCurentTurnIndex(0)
                setCurrentPlayerTurn(playerTurns[0])
                setGameStatus(numberOfTurns === 1 ? GameStatus.lastTurn : GameStatus.inProgress)
            })
    }

    const startNextTurn = () => {
        if (playerTurns && currentTurnIndex !== undefined && currentTurnIndex < playerTurns.length - 1) {

            setCurentTurnIndex(currentTurnIndex + 1)
            setCurrentPlayerTurn(playerTurns[currentTurnIndex + 1])

            if (currentTurnIndex === playerTurns.length - 2) {
                setGameStatus(GameStatus.lastTurn)
            }
        }
    }

    const submitAnswer = (answer: number, elapsedTime: number) => {
        const isCorrect = answer === currentPlayerTurn?.question.correctAnswer
        const score = calculateScore(isCorrect, elapsedTime);
        const questionStatus = isCorrect ? QuestionStatus.correct : QuestionStatus.incorrect

        updatePlayerTurn({
            score,
            questionStatus
        })
    }

    const updateGameSettings = (settingsName: string, value: any) => {
        switch (settingsName) {
            case 'allow_negatives':
                setGameSettings({
                    ...gameSettings,
                    allow_negatives: value
                })
                break
            case 'answer_format':
                setGameSettings({
                    ...gameSettings,
                    answer_format: value
                })
                break
            case 'min_number':
                setGameSettings({
                    ...gameSettings,
                    min_number: Number(value)
                })
                break
            case 'max_number':
                setGameSettings({
                    ...gameSettings,
                    max_number: Number(value)
                })
                break
            case 'number_count':
                if (Number(value) < 2 || Number(value) > 5) break
                setGameSettings({
                    ...gameSettings,
                    number_count: Number(value)
                })
                break
            case 'rounds_count':
                if (Number(value) < 1) break
                setGameSettings({
                    ...gameSettings,
                    rounds_count: Number(value)
                })
                break
            case 'operations':
                setGameSettings({
                    ...gameSettings,
                    operations: value
                })
                break
        }
    }

    const updatePlayers = ({playerName, action}: {
        playerName: Player['name'],
        action: 'add' | 'delete'
    }) => {
        if (action === 'add') {
            const hasExistingPlayerName = players.filter((player) => {
                player.name.toLocaleLowerCase().trim() === playerName.toLocaleLowerCase().trim()
            }).length > 0

            if (hasExistingPlayerName) {
                throw Error('Player name already exists');
            }

            const newPlayer = {
                id: players.length + 1,
                name: playerName,
                score: 0
            }
            setPlayers([
                ...players,
                newPlayer
            ])
        } 
        else if (action === 'delete') {
            setPlayers(players.filter((player) => player.name !== playerName))
        }
    }

    const updatePlayerTurn = (updatedPlayerTurn: Partial<PlayerTurn>) => {
        if (currentPlayerTurn) {
            setCurrentPlayerTurn({
                ...currentPlayerTurn,
                ...updatedPlayerTurn
            })
        }
    }

    useEffect(() => {
        const updatedPlayerTurns = playerTurns?.map(playerTurn => {
            if (playerTurn.id === currentPlayerTurn?.id) {
                return currentPlayerTurn
            } else {
                return playerTurn
            }
        })
        setPlayerTurns(updatedPlayerTurns)
    }, [currentPlayerTurn])

    useEffect(() => {
        if (playerTurns && playerTurns.length > 1 && currentTurnIndex !== undefined && gameStatus !== GameStatus.lastTurn) {
            setNextTurnPlayersName(playerTurns[currentTurnIndex + 1].player.name)
        }
    }, [currentTurnIndex])

    return (
        <GameContext.Provider
            value={{
                // Game State
                currentPlayerTurn,
                gameSettings,
                gameStatus,
                nextTurnPlayersName,
                players,
                playerTurns,

                // Game Methods
                finishGame,
                getPlayerScore,
                resetGame,
                startGame,
                startNextTurn,
                submitAnswer,
                updateGameSettings,
                updatePlayers,
                updatePlayerTurn
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export { GameProvider as default, GameContext }
