import { Question } from "@/types";
import { generateRandomNumberInRange } from "./generate-random-number";

interface Params {
    numberCount: number
    minNumber: number
    maxNumber: number
}

export const generateRandomNumbersArray = ({
    numberCount,
    minNumber,
    maxNumber
}: Params): number[] => {
    return Array.from({ length: numberCount }, () => generateRandomNumberInRange(minNumber, maxNumber)).sort((a,b) => b-a);
}