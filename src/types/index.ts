export enum AnswerState {
    newGame,
    unanswered,
    correct,
    incorrect
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
    score: number
}