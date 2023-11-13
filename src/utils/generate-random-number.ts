export const generateRandomNumberInRange = (min_number: number, max_number: number) => {
    return Math.floor(Math.random() * (max_number - min_number + 1) + min_number) 
}