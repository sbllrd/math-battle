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
    addition = 'Addition (+)',
    multiplication = 'Multiplication (x)',
    subtraction = 'Subtraction (-)',
}

export interface Question {
    correctAnswer: number,
    numbers: number[],
    operation: Operation
}

export enum AnswerFormat {
    multiple_choice= 'Multiple Choice',
    number_input = 'Number Input'
}

export interface GameSettings {
    allow_negatives: boolean
    answer_format: AnswerFormat
    max_number: number
    min_number: number
    number_count: number
    operations: Operation[]
    rounds_count: number
    show_answers?: boolean
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