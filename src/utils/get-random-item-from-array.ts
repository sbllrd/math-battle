export const getRandomItemFromArray = (items: any[]) => {
    return items[Math.floor(Math.random()*items.length)];
}