export const calculateScore = (isCorrect: boolean, elapsedSeconds: number) => {
    if (!isCorrect) return 0
    return Math.max(10, 100 - Math.floor(elapsedSeconds / 5) * 5)
}