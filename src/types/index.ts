export enum AnswerState {
    newGame,
    unanswered,
    correct,
    incorrect
}

export enum Operation {
    addition,
    subtraction
}

export interface Question {
    correctAnswer: number,
    numbers: number[],
    operation: Operation
}

export interface GameSettings {
    maxNumber: number
    minNumber: number
    numberCount: number
    operations: Operation[]
    roundsCount: number
}

export interface Player {
    id: number
    name: string
    score: number
}