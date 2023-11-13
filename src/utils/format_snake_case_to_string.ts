const formatSnakeCaseToString = (text: string) => {
    return   text.replace (/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
    .replace (/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase()) // First char after each -/_
}

export default formatSnakeCaseToString