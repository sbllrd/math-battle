export enum GameStatus {
    newGame = 'newGame',
    inProgress = 'inProgress',
    lastTurn = 'lastTurn',
    finished = 'finished'
}

export enum QuestionStatus {
    inProgress = 'inProgress',
    correct = 'correct',
    incorrect = 'incorrect'
}

export enum Operation {
    addition = 'addition',
    subtraction = 'subtraction'
}

export interface Question {
    correctAnswer: number,
    numbers: number[],
    operation: Operation
}

export interface GameSettings {
    max_number: number
    min_number: number
    number_count: number
    operations: Operation[]
    rounds_count: number
}

export interface Player {
    id: number
    name: string
}

export interface PlayerTurn {
    id: number
    player: Player
    question: Question
    questionStatus: QuestionStatus
    roundNumber: number
    score: number
    totalTurnNumber: number
}