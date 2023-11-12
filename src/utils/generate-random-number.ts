export const generateRandomNumberInRange = (minNumber: number, maxNumber: number) => {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber) 
}