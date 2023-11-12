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
    minNumber: number
    maxNumber: number
    numberCount: number
    operations: Operation[]
}

export interface Player {
    id: number
    name: string
    score: number
}