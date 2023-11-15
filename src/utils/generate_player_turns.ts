import { GameSettings, Player, PlayerTurn, QuestionStatus } from "@/types";
import { generateNumbersQuestion } from "./generate_numbers_question";

interface Params {
    gameSettings: GameSettings
    players: Player[]
}

export const generatePlayerTurns = async ({
    gameSettings,
    players
}: Params): Promise<PlayerTurn[]> => {

    let playerTurns: PlayerTurn[] = []
    let turnCount = 0

    for (let roundNumber = 1; roundNumber <= gameSettings.rounds_count; roundNumber++) {
        const playerTurnsForRound = players.map((player) => {
            turnCount++
            return {
                id: turnCount,
                player,
                question: generateNumbersQuestion(gameSettings),
                questionStatus: QuestionStatus.inProgress,
                roundNumber,
                score: 0,
                totalTurnNumber: turnCount
            }
        })
        playerTurns.push(...playerTurnsForRound)
    }
    return playerTurns
}