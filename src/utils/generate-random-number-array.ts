import { Question } from "@/types";
import { generateRandomNumberInRange } from "./generate-random-number";

interface Params {
    number_count: number
    min_number: number
    max_number: number
}

export const generateRandomNumbersArray = ({
    number_count,
    min_number,
    max_number
}: Params): number[] => {
    return Array.from({ length: number_count }, () => generateRandomNumberInRange(min_number, max_number));
}
