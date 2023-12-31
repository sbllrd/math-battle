import { Operation } from "@/types"

export const getCorrectAnswer = (numbers: number[] , operation: Operation) => {
    switch (operation) {
        case Operation.addition:
            return numbers.reduce((a,b)=>a+b)
        case Operation.subtraction:
            return numbers.reduce((a,b)=>a-b)
        case Operation.multiplication:
            return numbers.reduce((a,b)=>a*b)
    }
}