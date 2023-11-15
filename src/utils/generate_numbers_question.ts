import { GameSettings, Question } from "@/types";
import { getCorrectAnswer } from "./get_correct_answer";
import { generateRandomNumbersArray } from "./generate-random-number-array";
import { getRandomItemFromArray } from "./get-random-item-from-array";

export const generateNumbersQuestion = (gameSettings: GameSettings): Question => {
    const {number_count, min_number, max_number} = gameSettings
    const operation = getRandomItemFromArray(gameSettings.operations)
    const numbers = generateRandomNumbersArray({
        number_count,
        min_number,
        max_number
    })
    const correctAnswer = getCorrectAnswer(numbers, operation);
    return {
        numbers,
        operation,
        correctAnswer
    }
}