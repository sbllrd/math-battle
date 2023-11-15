import { GameSettings, Operation, Player } from "@/types"

export const DEFAULT_GAME_SETTINGS: GameSettings = {
    min_number: 50,
    max_number: 300,
    number_count: 2,
    operations: [Operation.addition],
    rounds_count: 5
}

export const TEST_GAME_SETTINGS: GameSettings = {
    min_number: 1,
    max_number: 1,
    number_count: 2,
    operations: [Operation.addition],
    rounds_count: 5
}


export const TEST_PLAYERS: Player[] = [
    {id: 1, name: 'Player 1'},
    {id: 2, name: 'Player 2'},
    // {id: 3, name: 'Player 3'}
]