import { Operation } from "@/types"
import { generateRandomNumberInRange } from "./generate-random-number"
import { getRandomItemFromArray } from "./get-random-item-from-array"
import shuffleArray from "./shuffle_array"

const generateNumberMultipleChoiceOptions = (correctAnswer: number, numberOfOptions: number) => {
    const validatedNumberOfOptions = Math.max(Math.min(numberOfOptions, 20), 1)
    
    const fuzzyValues = [ -1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -10, 10, -15, 15, -20, 20, -100, 100, -101, 101]
    let usedFuzzyValues: number[] = []

    const randomOptions = Array.from({ length: validatedNumberOfOptions })
        .map((number, index) => {
            if (index === 0) {
                return correctAnswer
            } else {
                const fuzzyValue: number = getRandomItemFromArray(fuzzyValues.filter(value => !usedFuzzyValues.includes(value)))
                usedFuzzyValues.push(fuzzyValue)
                const numberChoice = correctAnswer + fuzzyValue
                return numberChoice
            }
        })
    
    return shuffleArray(randomOptions)
}

export default generateNumberMultipleChoiceOptions