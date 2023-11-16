import { GameSettings, Operation, Question } from "@/types";
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
    const shouldSort = operation === Operation.addition || (operation === Operation.subtraction && !gameSettings.allow_negatives)
    const sortedNumbers = shouldSort ? numbers.sort((a,b) => b-a) : numbers
    const correctAnswer = getCorrectAnswer(sortedNumbers, operation);
    return {
        numbers,
        operation,
        correctAnswer
    }
}
